<template>
  <div class="calendar">
    <div class="border_title">
      <div class="item" v-for="item in week">{{item}}</div>
    </div>
    <div class="border" :style="{height: borderHeight + 'rem'}">
      <div class="row" v-for="item in arr" :style="{left: offsetBorder + 'rem'}">
        <div class="item" v-for="it in item" :class="{red: it == date.getDate()}" v-show="showNum(it)">
          <div v-show="it">
            <div class="tag free" v-if="workOrRest(it)">休</div>
            <div class="tag" v-else>班</div>
          </div>
          <span>{{it}}</span>
          <span v-if="typeof workOrRest(it) == 'string'" class="festival">{{workOrRest(it)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  holiday
} from './option'
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      timer: false,
      arr: [
        [, , , , , , 1, 2, 3, 4, 5, 6, 7],
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        [23, 24, 25, 26, 27, 28, 29, 30, 31, , , , , ],
        [30, 31, , , , , , , , , , , , ]
      ],
      week: ['日', '一', '二', '三', '四', '五', '六'],
      date: '',
    };
  },
  created() {
    // this.date = new Date('2020/10/01');
    this.date = new Date();
  },
  mounted() {
    let that = this;
    that.setFontSize();
    window.onresize = () => {
      return (() => {
        let width = document.body.clientWidth;
        that.screenWidth = width;
      })()
    }
  },
  methods: {
    setFontSize() {
      if (this.screenWidth < 760) {
        document.documentElement.style.fontSize = this.screenWidth / 60 + "px";
      } else {
        document.documentElement.style.fontSize = this.screenWidth / 100 + "px";
      }
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(() => {
          that.setFontSize();
          that.timer = false;
        }, 10);
      }
    }
  },
  computed: {
    // 缩进
    offsetBorder: function() {
      let m = this.date;
      // 获得本月1日
      let d = new Date(`${m.getFullYear()}/${m.getMonth() + 1}`);
      // 1日是周几
      let day = d.getDay();
      // 如果是周日转换为7
      if (day == 0) {
        day = 7;
      }
      // 缩进格数
      let week = day - (1 % 7 - 1);
      return (week - 6) * 7;
    },
    // 表格高度
    borderHeight: function() {
      let d = this.date;
      let f = new Date(`${d.getFullYear()}/${d.getMonth() + 1}/01`);
      let H = f.getDay() > 4 ? 6 : 5;
      return H * 3;
    },
    // 工作日或者休假
    workOrRest: function() {
      return function(day) {
        let year = this.date.getFullYear();
        let month = this.date.getMonth() + 1;
        let newDate = new Date(`${year}/${month}/${day}`);
        let result = newDate.getDay();
        // 国家法定节假日月份
        if (holiday.rest[month]) {
          if (holiday.rest[month].indexOf(String(day)) >= 0) {
            let festival = holiday.festival[month][day];
            return festival || true;
          }
        }
        // 国家法定节假日的调休
        if (holiday.work[month]) {
          if (holiday.work[month].indexOf(String(day)) >= 0) {
            return false;
          }
        }
        // 正常周末
        return (result == 0) || (result == 6);
      }
    },
    // 31日 30日 显隐
    showNum: function() {
      return function(e) {
        let bool = true;
        // 2, 4、6、9、11月 没有三十一日
        if ([2, 4, 6, 9, 11].includes(this.date.getMonth() + 1)) {
          if (e == 31) {
            bool = false;
          }
        }
        // 2月 平年 没有三十日
        if (this.date.getMonth() + 1 == 2 && e == 29) {
          bool = !(this.date.getFullYear() % 4);
        }
        return bool;
      }
    }
  },
}
</script>
<style scoped>
.calendar {
  position: relative;
  width: 49rem;
  margin: 0 auto;
  overflow: hidden;
}

.border {
  border: 1px solid #f74242;
  border-radius: 0 0 4px 4px;
  width: 100%;
  box-sizing: border-box;
}

.border_title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: #ffffff;
  background-color: #f74242;
  border: 1px solid #f74242;
  border-radius: 4px 4px 0 0;
  border-bottom: none;
  box-sizing: border-box;
}

.row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 91rem;
  position: relative;
}

.item {
  position: relative;
  width: 7rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}

.tag {
  position: absolute;
  top: 0;
  right: 0;
  width: 1.4rem;
  line-height: 1.4rem;
  font-size: 0.8rem;
  background-color: #f74242;
  color: #ffffff;
  z-index: -1;
}

.free {
  background-color: #42d3f7;
}

.red {
  background-color: #62e795;
  color: #ffffff;
}

.red>div>.tag {
  background-color: #ffffff;
  color: #62e795;
  z-index: 1;
}

.festival {
  font-size: 0.6rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0.8rem;
  background: #f74242;
  color: #ffffff;
  padding: 0.1rem 0;
}
</style>
