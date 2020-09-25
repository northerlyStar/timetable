<template>
  <div class='gitPage'>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-row>
          <el-col :span="24">
            <div class="title">git常用语句&nbsp;<ruby>(个人向、待补充)<rt>我是真的喜欢蓝色</rt></ruby></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" v-for="(item, index) in data" :key="index">
          <el-col :span="20">
            <div class="title">{{item.command}}</div>
            <div>{{item.desc}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="small_font">要是有写错的地方，那我就GG了</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
  data() { 
    return {
      data: [
        {
          command: 'git pull origin',
          desc: '数据拉取，将远程仓库同步到本地',
        },
        {
          command: 'git push origin',
          desc: '数据推送，将代码同步到远程仓库',
        },
        {
          command: 'git remote -v',
          desc: '远程仓库地址',
        },
        {
          command: 'git branch',
          desc: '代码分支，加上‘-a’就可以查看全部分支，包括远程分支',
        },
        {
          command: 'git checkout -b branch1',
          desc: '创建本地分支branch1，并且切换到分支branch1',
        },
      ]
    };
  },
  mounted () {},
  methods: {},
  watch: {},
  computed: {},
}
</script>
<style scoped>
.gitPage {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  line-height: 1.5;
  font-size: 14px;
}
.small_font {
  font-size: 10px;
  line-height: 1.7;
  color: #7e7e7e;
}
.title {
  font-size: 18px;
  line-height: 1.7;
  color: #4ca1e6;
}
.small_title {
  font-size: 16px;
  line-height: 1.7;
  color: #8cc3f0;
}
.page_title {
  font-size: 20px;
  line-height: 1.7;
  color: #0088f8;
}
</style>