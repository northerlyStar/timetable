<template>
  <div>
    <el-button type="text" @click="changePostOrGet">切换到{{upload?'图表':'爬虫'}}</el-button>
    <el-form v-show="upload" ref="uploadForm" :model="uploadFormData" :rules="uploadRules" label-width="65px" class="demo-ruleForm">
      <el-form-item label="上传目标城市：" prop="city">
        <el-input v-model="uploadFormData.city" />
      </el-form-item>
      <el-form-item label="上传目标时间：" prop="date">
        <el-input v-model="uploadFormData.date" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setCity">提交</el-button>
        <el-button @click="reset('uploadForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-form v-show="!upload" ref="form" :model="formData" :rules="rules" label-width="65px" class="demo-ruleForm">
      <el-form-item label="城市：" prop="city">
        <el-input v-model="formData.city" />
      </el-form-item>
      <el-form-item label="年份：" prop="year">
        <el-input v-model="formData.year" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getApi">查询</el-button>
        <el-button @click="reset('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <div id="mychart"></div>
  </div>
</template>

<script>
import {city as pinyin} from './pinyin';
//echarts
let echarts = require('echarts');
export default {
  data () {
    return {
      upload: false,
      uploadFormData: {
        city: '',
        date: '',
      },
      formData: {
        city: '',
        year: '',
      },
      uploadRules: {
        city: [
          { required: true, message: '内容不能爲空', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '内容不能爲空', trigger: 'blur' }
        ],
      },
      rules: {
        city: [
          { required: true, message: '内容不能爲空', trigger: 'blur' }
        ],
        year: [
          { required: true, message: '内容不能爲空', trigger: 'blur' }
        ],
      },
      chart: '',
      chartOption: {
        title: {
          text: ''
        },
        tootip: {},
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: [
          {
            name: '最高气温',
            type: 'scatter',
            data: [],
          },
          {
            name: '最低气温',
            type: 'scatter',
            data: [],
            color: '#2cb4e5'
          },
          {
            name: '气温温差',
            type: 'bar',
            data: [],
            color: '#000000'
          }
        ]
      },
    };
  },
  mounted () {
  },
  methods: {
    changePostOrGet () {
      this.upload = !this.upload;
    },
    getApi () {
      let _this = this;
      let city = pinyin[this.formData.city];
      let url = `http://localhost:4000/weather?city=${city}&year=${this.formData.year}`;
      this.axios.get(url).then((res) => {
        // 清除脏数据
        // _this.chartOption.series = _this.chartOption.series.map(({data}) => []);
        for (let i = 0; i < res.data.data.length; i++) {
          _this.chartOption.title.text = `${_this.formData.year}年 ${_this.formData.city} 最高气温和最低气温`
          _this.chartOption.xAxis.data[i] = `${res.data.data[i].date.substr(5, 2)}/${res.data.data[i].date.substr(8, 2)}`;
          console.log(res.data.data);
          // 赋值新数据
          _this.chartOption.series[0].data[i] = parseInt(res.data.data[i].maxTemperature);
          _this.chartOption.series[1].data[i] = parseInt(res.data.data[i].minTemperature);
          _this.chartOption.series[2].data[i] = parseInt(res.data.data[i].maxTemperature) - parseInt(res.data.data[i].minTemperature);
        }
        this.setChart();
      }).catch((err) => {
        console.log(err);
      })
    },
    setChart () {
      document.getElementById('mychart').style.height = '550px';
      document.getElementById('mychart').style.width = '100%';
      let myChart = echarts.init(document.getElementById('mychart'));
      myChart.setOption(this.chartOption);
    },
    reset (formName) {
      this.$refs[formName].resetFields();
    },
    // 爬虫城市 接口
    setCity () {
      let _this = this;
      let url = `http://localhost:4000/saveWeather`;
      let params = {
        city: pinyin[_this.uploadFormData.city],
        date: _this.uploadFormData.date
      }
      this.axios.post(url, params).then((res) => {
        console.log('上传成功', res);
        // 接口返回消息之后，切换发起请求
        this.changePostOrGet();
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  watch: {},
  computed: {},
}
</script>
<style scoped>
.box {
  padding: 24px;
}
</style>
