<template>
  <div class="demo-form">
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="目標網址：" prop="page">
        <el-input v-model="formData.page" />
      </el-form-item>
      <el-form-item label="目標標簽：" prop="tag">
        <el-input v-model="formData.tag" />
      </el-form-item>
      <el-form-item label="目標類名：" prop="class">
        <el-input v-model="formData.class" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="start">開始獲取</el-button>
        <el-button @click="reset('form')">開始獲取</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        page: '',
        tag: '',
        class: ''
      },
      rules: {
        page: [
          { required: true, message: '内容不能爲空', trigger: 'blur' }
        ],
        tag: [
          { required: true, message: '内容不能爲空', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '内容不能爲空', trigger: 'blur' }
        ]
      }
    };
  },
  mounted () { },
  methods: {
    start () {
      this.axios({
        method: 'post',
        url: 'http://localhost:4000/getHtmlText',
        data: this.formData
      }).then(() => {
        console.log("開始獲取");
      }).catch((response) => {
        console.log(response)
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {},
  computed: {},
}
</script>
<style scoped>
.demo-form {
  width: 460px;
  margin: 2rem auto 0;
}
</style>