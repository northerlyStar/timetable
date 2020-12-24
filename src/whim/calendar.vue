<template>
  <div class="calendar">
    <div class="border_title">
      <div class="item" v-for="(item, index) in week" :key="index">{{item}}</div>
    </div>
    <div class="border" :style="{ height: borderHeight + 'rem' }">
      <div class="row" v-for="(item, index) in arr" :key="'item' + index" :style="{ left: offsetBorder + 'rem' }">
        <div v-for="it in item" :key="it" :class="['item', { red: it == date.getDate() }]" :style="{ height: itemHeight + 'rem', lineHeight: itemHeight + 'rem',}" v-show="showNum(it)">
          <div v-show="it">
            <div class="tag free" v-if="workOrRest(it)">休</div>
            <div class="tag" v-else>班</div>
          </div>
          <span>{{it}}</span>
          <span v-if="typeof workOrRest(it) == 'string'" class="festival">{{workOrRest(it)}}</span>
          <span v-if="jieqi(it)" class="festival">{{jieqi(it)}}</span>
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
      // item 行高 单位rem
      itemHeight: 5,
      // 本月节气日期
      d: [],
      // 节气中文
      solarTerms: [],
    };
  },
  created() {
    // this.date = new Date('2020/10/01');
    this.date = this.$store.getters.getDate;
    this.d = this.formula();
  },
  mounted() {
    let that = this;
    that.setFontSize();
    window.onresize = () => {
      return (() => {
        let width = document.body.clientWidth;
        that.screenWidth = width;
      })();
    };
  },
  methods: {
    // 寿星公式 (Y * D + C) - L
    formula() {
      let y = new Date().getFullYear();
      let D = 0.2422;
      // 获取C值
      let month = new Date().getMonth() + 1;
      let C = [
        holiday.cOfSolarTerms[month * 2 - 2],
        holiday.cOfSolarTerms[month * 2 - 1],
      ];
      this.solarTerms = [
        holiday.solarTerms[month * 2 - 2],
        holiday.solarTerms[month * 2 - 1],
      ];
      // 计算L
      let L = Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
      return C.map((data) => {
        return Math.round(y * D + data) - L;
      });
    },
    setFontSize() {
      if (this.screenWidth < 760) {
        document.documentElement.style.fontSize = this.screenWidth / 60 + "px";
      } else {
        document.documentElement.style.fontSize = this.screenWidth / 100 + "px";
      }
    },
    // 农历
    lunarCalendar() {
      // 农历年 十六进制
      let lunar = holiday.lunarInfo[this.date.getFullYear() - 1900].toString(2);
      // 不足十六位
      if (lunar.length < 16) {
        // 补足十六位
        for (let i = lunar.length; lunar.length < 16; i++) {
          lunar = "0" + lunar;
        }
      }
      // 取1-4位算闰月是哪月
      let ifLeap = parseInt(lunar.substring(lunar.length - 4), 2);
      // 5-16位各月份天数
      let lunarMonth = lunar.slice(0, lunar.length - 4);
      // 闰月为大月还是小月
      let leap;
      if (ifLeap !== 0) {
        leap = holiday.lunarInfo[this.date.getFullYear() - 1900] + '';
      }
      console.log('十六进制：', lunar, '闰月：', ifLeap, '农历各月份天数：', lunarMonth, '闰月大小：', leap);
    },
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
    },
  },
  computed: {
    // 缩进
    offsetBorder: function () {
      let m = this.date;
      // 获得本月1日
      let d = new Date(`${m.getFullYear()}/${m.getMonth() + 1}/01`);
      // 1日是周几
      let day = d.getDay();
      // 缩进格数
      let week = day - ((1 % 7) - 1);
      return (week - 6) * 7;
    },
    // 表格高度
    borderHeight: function () {
      let d = this.date;
      let f = new Date(`${d.getFullYear()}/${d.getMonth() + 1}/01`);
      let H = f.getDay() > 4 ? 6 : 5;
      return H * this.itemHeight;
    },
    jieqi: function () {
      return function (day) {
        // 二十四节气
        if (this.d.indexOf(day) >= 0) {
          let solarTerms = this.solarTerms[this.d.indexOf(day)];
          return solarTerms || true;
        }
      };
    },
    // 工作日或者休假
    workOrRest: function () {
      return function (day) {
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
        return result == 0 || result == 6;
      };
    },
    // 31日 30日 显隐
    showNum: function () {
      return function (e) {
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
      };
    },
  },
};
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
  border-bottom-width: 2px;
  border-right-width: 2px;
  border-radius: 0 0 4px 4px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.border_title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: #ffffff;
  background-color: #f74242;
  border-radius: 4px 4px 0 0;
  box-sizing: border-box;
  overflow: hidden;
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
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #f74242;
  z-index: 999;
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

.red > div > .tag {
  background-color: #ffffff;
  color: #62e795;
  z-index: 1;
}

.festival {
  font-size: 0.9rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 1.3rem;
  background: #f74242;
  color: #ffffff;
  padding: 0.2rem 0;
  font-weight: normal;
}
</style>
