<template>
  <div class="countdown">
    <span class="time title">{{title}}</span>
    <div v-if="hours">
      <span>已发售</span>
    </div>
    <div v-else>
      <span class="time">{{hours}}</span>
      <span class="time">:</span>
      <span class="time">{{minutes}}</span>
      <span class="time">:</span>
      <span class="time">{{seconds}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '距离冰原发售还有',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  },
  mounted () {
    setInterval(() => {
      this.countdown("2020-01-10 01:00");
    }, 250);
  },
  methods: {
    countdown (date) {
      let targetTime = new Date(date);
      let currentTime = new Date();
      let intervalTime = parseInt((targetTime.getTime() - currentTime.getTime()) / 1000);
      this.hours = parseInt(intervalTime / 3600);
      if (this.hours<0) {
        return false;
      }
      if (this.hours < 10) {
        this.hours = `0${this.hours}`;
      }
      this.minutes = parseInt((intervalTime - this.hours * 3600) / 60);
      if (this.minutes < 10) {
        this.minutes = `0${this.minutes}`;
      }
      this.seconds = parseInt(intervalTime - this.hours * 3600 - this.minutes * 60);
      if (this.seconds < 10) {
        this.seconds = `0${this.seconds}`;
      }
    },
    getData(){
      // feiyan/ city
      // let url = 'https://iflow-api.uc.cn/feiyan/special?uc_param_str=pccplomi&feiyan=1&district=1&tabStart=0&tabEnd=1&tabBrief=1' 
    }
  },
  watch: {},
  computed: {},
}
</script>
<style scoped>
.countdown {
  width: 100%;
  height: 100%;
  background-color: #42d5ff;
  text-align: center;
  user-select: none;
}
.time {
  color: #ffffff;
  font-size: 100px;
  font-family: "Microsoft YaHei";
  user-select: none;
}
.title {
  font-size: 50px;
}
</style> 