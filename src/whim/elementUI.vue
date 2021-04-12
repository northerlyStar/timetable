<template>
  <div class="container">
    <div>自定义选项颜色</div>
    <el-checkbox-group v-model="formData" @change="changeRadioButtonColor">
      <el-checkbox-button
        v-for="(radio, index) in config"
        :key="index"
        :label="radio.value"
        :ref="'checkbox' + index"
        >{{ radio.name }}</el-checkbox-button
      >
    </el-checkbox-group>
    <div>下拉列表联动</div>
    <el-row>
      <el-col :span="7">
        <el-select v-model="value" placeholder="请选择" @change="changeSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-input v-model="input"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-button @click="setHeaders()">set header</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: [],
      config: [
        {
          name: "1",
          value: 1,
          color: "#ff0000",
        },
        {
          name: "2",
          value: 2,
          color: "#00ff00",
        },
        {
          name: "3",
          value: 3,
          color: "#0000ff",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
          class: 1,
          shop: "店铺1",
        },
        {
          value: "选项2",
          label: "双皮奶",
          class: 2,
          shop: "店铺2",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
          class: 3,
          shop: "店铺3",
        },
        {
          value: "选项4",
          label: "龙须面",
          class: 4,
          shop: "店铺4",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
          class: 5,
          shop: "店铺5",
        },
      ],
      value: "",
      value2: "",
      options2: [
        {
          value: 1,
          name: "选项1",
        },
        {
          value: 2,
          name: "选项2",
        },
        {
          value: 3,
          name: "选项3",
        },
        {
          value: 4,
          name: "选项4",
        },
        {
          value: 5,
          name: "选项5",
        },
      ],
      input: "",
      correspond: [
        {
          control: "value2",
          value: "class",
        },
        {
          control: "input",
          value: "value",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    changeRadioButtonColor($event) {
      const index = this.config.filter((data, index) => {
        data.index = index;
        return data.value === $event[$event.length - 1];
      });
      const dom = this.$refs["checkbox" + index[0]?.index][0].$el.children[1];
      dom.style.background = index[0].color;
      dom.style.borderColor = index[0].color;
      dom.style.boxShadow = `-1px 0 0 0 ${index[0].color}`;
    },
    changeSelect(item) {
      for (const iterator of this.correspond) {
        this[iterator.control] = item[iterator.value];
      }
    },
    // 设置请求头测试
    async setHeaders() {
      const url = "http://localhost:4000/saveWeather";
      const params = { test: "test" };
      const headers = { token: "fullName" };
      const { data } = await this.axios.post(url, params, { headers });
      // const { data } = await this.axios.post(url, params);
      console.log(data);
    },
  },
  watch: {},
  computed: {},
};
</script>
<style scoped>
</style>