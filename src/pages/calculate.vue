<template>
  <div class="calculate">
    <div>
      <span style="font-size: 18px; line-height: 1.7;">我爱B站，B站爱我</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <span>目标经验：</span>
        <el-input type="number" placeholder="请输入目标经验值" v-model="max_Exp"></el-input>
      </el-col>
      <el-col :span="8">
        <span>当前经验：</span>
        <el-input type="number" placeholder="请输入当前经验值" v-model="current_Exp"></el-input>
      </el-col>
      <el-col :span="8">
        <span>拥有硬币：</span>
        <el-input type="number" placeholder="请输入当前硬币数量" v-model="current_coin"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <el-button type="primary" @click="count">开始计算</el-button>
      </el-col>
    </el-row>
    <el-row v-show="day_count">
      <el-col>结果：满级所需{{day_count}}天</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      max_Exp: '',
      current_Exp: '',
      current_coin: '',
      day_count: '',
    };
  },
  mounted () {
  },
  methods: {
    count () {
      // 天数
      let day_count = 0;
      // 最大经验值
      let max = this.max_Exp || 28800;
      // 当前经验值
      let current = Number(this.current_Exp) || 0;
      // 需要的经验
      let need_Exp = max - current;
      // 当前硬币数量
      let coin = this.current_coin || 0;
      // "今天"可以获得的经验
      let today_Exp;

      // 计算
      // console.log('计算详情');
      for (let i = 0; need_Exp > 0; i++) {
        let use_coin;
        // 判断当前有没有5个硬币
        if (coin + 1 >= 5) {
          coin -= 4;
          today_Exp = 60;
          use_coin = 5;
        } else {
          coin += 1;
          today_Exp = 10;
          use_coin = 0;
        }
        need_Exp -= today_Exp;
        current += today_Exp;
        day_count += 1;
        console.log(`第${day_count}天，使用${use_coin}个，当前剩余硬币：${coin}个，今天获得经验：${today_Exp}，总经验：${current}`);
        // console.log(`-----------------------------------------------------------------`);
      }
      // console.log('计算结束');
      // 返回结果
      this.day_count = day_count;
    }
  },
  watch: {},
  computed: {},
}
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>