<template>
  <div>
    <div class="eidt_switch">
      <el-switch
        v-model="calendarConfig.isEdit"
        active-text="编辑模式"
      ></el-switch>
    </div>
    <!-- 日历主体 -->
    <div class="calendar">
      <!-- 日历表头 -->
      <div
        class="border_title"
        :style="{
          backgroundColor: calendarConfig.tableHead.backgroundColor,
          color: calendarConfig.tableHead.color,
        }"
      >
        <div class="" v-for="(item, index) in week" :key="index">
          {{ item }}
        </div>
      </div>
      <!-- 日历内容 -->
      <div class="border" :style="{ height: borderHeight + 'rem' }">
        <div
          class="row"
          v-for="(item, index) in arr"
          :key="'item' + index"
          :style="{ left: offsetBorder + 'rem' }"
        >
          <div
            v-for="it in item"
            :key="it"
            class="item"
            :style="{
              height: itemHeight + 'rem',
              lineHeight: itemHeight + 'rem',
              backgroundColor: todayBC(it),
              color: todayC(it),
            }"
            v-show="showNum(it)"
          >
            <div v-show="it">
              <div
                class="tag"
                :style="{
                  color: todayTC(it, calendarConfig.tableBody.restColor),
                }"
                v-if="workOrRest(it)"
              >
                休
              </div>
              <div
                class="tag"
                :style="{
                  color: todayTC(it, calendarConfig.tableBody.workColor),
                }"
                v-else
              >
                班
              </div>
            </div>
            <span>{{ it }}</span>
            <span
              v-if="typeof workOrRest(it) == 'string'"
              class="festival"
              :style="{ color: calendarConfig.tableBody.festivalColor }"
              >{{ workOrRest(it) }}</span
            >
            <span
              v-if="jieqi(it)"
              class="festival"
              :style="{ color: calendarConfig.tableBody.festivalColor }"
              >{{ jieqi(it) }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 控制面板 -->
    <div class="calendar_config" v-if="calendarConfig.isEdit">
      <el-form label-width="8rem">
        <!-- 表格表头的配置 -->
        <div class="calendar_config_group">
          <div class="calendar_title">表头配置</div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="表头背景颜色">
                <el-color-picker
                  v-model="calendarConfig.tableHead.backgroundColor"
                ></el-color-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表头文字颜色">
                <el-color-picker
                  v-model="calendarConfig.tableHead.color"
                ></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 表格的配置 -->
        <div class="calendar_config_group">
          <div class="calendar_title">表格配置</div>
          <!-- item的背景颜色和文字颜色 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="背景颜色">
                <el-color-picker
                  v-model="calendarConfig.tableBody.backgroundColor"
                ></el-color-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文字颜色">
                <el-color-picker
                  v-model="calendarConfig.tableBody.color"
                ></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 节日、节气的文字 -->
          <el-row>
            <el-col>
              <el-form-item label="节日文字颜色">
                <el-color-picker
                  v-model="calendarConfig.tableBody.festivalColor"
                ></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 休息、上班角标 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="休息角标颜色">
                <el-color-picker
                  v-model="calendarConfig.tableBody.restColor"
                ></el-color-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上班角标颜色">
                <el-color-picker
                  v-model="calendarConfig.tableBody.workColor"
                ></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 今日的特别配色 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="今日背景颜色">
                <el-color-picker
                  v-model="calendarConfig.tableBody.todayBackgroundColor"
                ></el-color-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="今日文字颜色">
                <el-color-picker
                  v-model="calendarConfig.tableBody.todayColor"
                ></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="14" :span="4">
              <el-button @click="resetCalendarConfig">重置</el-button>
            </el-col>
            <el-col :span="4">
              <el-button @click="saveCalendarConfig" type="primary"
                >保存</el-button
              >
            </el-col>
          </el-row>
          <!--  -->
        </div>
      </el-form>
    </div>
    <div class="live2d">
      <live2d
        :height="350"
        :modelPath="'/live2dw/assets/asuna_33.model.json'"
      ></live2d>
    </div>
  </div>
</template>

<script>
import { holiday } from "./option";
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
        [23, 24, 25, 26, 27, 28, 29, 30, 31, , , , , , ,],
        [30, 31, , , , , , , , , , , ,],
      ],
      week: ["日", "一", "二", "三", "四", "五", "六"],
      date: "",
      // item 行高 单位rem
      itemHeight: 4,
      // 本月节气日期
      d: [],
      // 节气中文
      solarTerms: [],
      // 日历配置
      calendarConfig: {
        // 编辑状态
        isEdit: false,
        // 表头配置
        tableHead: {
          backgroundColor: "#f74242",
          color: "#ffffff",
        },
        // 表格配置
        tableBody: {
          // 边框
          border: "",
          // 背景颜色
          backgroundColor: "#f8f8f8",
          // 文字颜色
          color: "#000000",
          // 节日文字颜色
          festivalColor: "#f74242",
          // 休息角标颜色
          restColor: "#0d9bee",
          // 上班角标颜色
          workColor: "#f74242",
          // 今日文字颜色
          todayColor: "#ffffff",
          // 今日背景颜色
          todayBackgroundColor: "#62e795",
        },
      },
    };
  },
  created() {
    // this.date = new Date('2020/10/01');
    this.date = this.$store.getters.getDate;
    this.d = this.formula();
  },
  mounted() {
    // 查询本地是否有日历的配置缓存
    this.checkCalendarConfigStorage();
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
    // 查询本地配置缓存
    checkCalendarConfigStorage() {
      // 判断有没有本地缓存配置
      if (localStorage.getItem("calendarConfig")) {
        // 替换
        const config = JSON.parse(localStorage.getItem("calendarConfig"));
        this.calendarConfig = config;
      } else {
        return false;
      }
    },
    // 重置日历配置
    resetCalendarConfig() {
      this.calendarConfig.tableHead = {
        backgroundColor: "#f74242",
        color: "#ffffff",
      };
      this.calendarConfig.tableBody = {
        border: "",
        backgroundColor: "#f8f8f8",
        color: "#000000",
        festivalColor: "#f74242",
        restColor: "#0d9bee",
        workColor: "#f74242",
        todayColor: "#ffffff",
        todayBackgroundColor: "#62e795",
      };
    },
    // 保存日历配置
    saveCalendarConfig() {
      localStorage.setItem(
        "checkCalendarConfigStorage",
        JSON.stringify(this.calendarConfig)
      );
      this.calendarConfig.isEdit = false;
    },
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
        leap = holiday.lunarInfo[this.date.getFullYear() - 1900] + "";
      }
      console.log(
        "十六进制：",
        lunar,
        "闰月：",
        ifLeap,
        "农历各月份天数：",
        lunarMonth,
        "闰月大小：",
        leap
      );
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
        if ([2, 4, 6, 9, 11].includes(this.date.getMonth() + 1) && e == 31) {
          bool = false;
        }
        // 2月 平年 没有三十日
        if (this.date.getMonth() + 1 == 2 && e == 30) {
          bool = false;
        }
        // 2月 闰年 有二十九日
        if (this.date.getMonth() + 1 == 2 && e == 29) {
          bool = !(this.date.getFullYear() % 4);
        }
        return bool;
      };
    },
    // 计算是否为今日
    todayBC: function () {
      return (it) => {
        return it !== this.date.getDate()
          ? this.calendarConfig.tableBody.backgroundColor
          : this.calendarConfig.tableBody.todayBackgroundColor;
      };
    },
    // 计算是否为今日
    todayC: function () {
      return (it) => {
        return it !== this.date.getDate()
          ? this.calendarConfig.tableBody.color
          : this.calendarConfig.tableBody.todayColor;
      };
    },
    // 计算是否为今日
    todayTC: function () {
      return (it, color) => {
        return it !== this.date.getDate()
          ? color
          : this.calendarConfig.tableBody.todayColor;
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

.eidt_switch {
  position: absolute;
  right: 0;
  top: 70px;
}

.border {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.border_title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 1.2rem;
  padding: 0.5rem 0;
  margin-bottom: 0.3rem;
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
  font-size: 1.3rem;
  border-radius: 0.7rem;
}

.item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #ffffff;
  z-index: 999;
}

.tag {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.4rem;
  line-height: 1.4rem;
  font-size: 0.8rem;
}

.festival {
  font-size: 0.9rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 1.3rem;
  color: #f74242;
  padding: 0.2rem 0;
  font-weight: normal;
}

.calendar_config {
  margin: 0 auto;
  width: 49rem;
}

.calendar_title {
  font-size: 1.3rem;
}

.live2d {
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
