<template>
  <div class>
    <h1>这个页面用来调试接口返回数据</h1>
    <h3>server.js定时抓取数据存入数据库，前端调取接口时从再返回数据库中所保存的数据</h3>
    <div class>4000端口的user接口数据：{{ data }}</div>

    <h2 style="margin: 22px;">B站今日番剧</h2>
    <div class="container">
      <!-- <el-timeline> -->
        <div
          v-show="biliData && reg(item.title)"
          v-for="(item, index) in biliData"
          :key="index"
          :timestamp="item.pub_time"
        >
          <a :href="item.url">
            <div class="single">
              <el-image :src="item.cover" :alt="item.title" class="image">
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span class="dot">...</span>
                </div>
              </el-image>
              <!-- <img :src="item.cover" alt class="img" /> -->
              <h4 class="title">{{item.title}}</h4>
              <!-- <h4 class="title">{{item.pub_time}}</h4> -->
            </div>
          </a>
        </div>
      <!-- </el-timeline> -->
    </div>
    <h2 style="margin: 22px;">我的追番</h2>
    <div class="container">
      <!-- <el-timeline> -->
        <div
          v-for="(item, index) in followData"
          :key="index"
          :timestamp="item.pub_time"
        >
          <a :href="item.url">
            <div class="single">
              <div class="image">
                <span class="label" v-show="item.badge">{{item.badge}}</span>
                <el-image :src="item.cover" :alt="item.title">
                  <div slot="placeholder" class="image-slot">
                    加载中
                    <span class="dot">...</span>
                  </div>
                </el-image>
              </div>
              <div class="text">
                <!-- <img :src="item.cover" alt class="img" /> -->
                <h4 class="title">{{item.title}}</h4>
                <h4 class="title">{{item.progress}}</h4>
              </div>
            </div>
          </a>
        </div>
      <!-- </el-timeline> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      biliData: [],
      followData: [],
    };
  },
  mounted () {
    this.getData();
    this.biliApi();
    this.follow();
  },
  methods: {
    // 接口请求
    getData () {
      let url = "http://localhost:4000/user";
      this.axios.get(url).then((res) => {
        this.data = res.data.data;
      }).catch((response) => {
        console.log(response);
        this.data = response;
      });
    },
    // B站 跨域
    biliApi () {
      let url = "http://localhost:4000/bili";
      this.axios.get(url).then((res) => {
        this.biliData = res.data.data;
      }).catch((response) => {
        console.log(response);
      })
    },
    // 我的追番
    follow () {
      let url = "http://localhost:4000/follow";
      // let ts = new Date().getTime();
      // let url = `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=1&ps=15&vmid=13105818&ts=${ts}`;
      this.axios.get(url).then((res)=>{
        this.followData = res.data.data.list;
      }).catch((response) => {
        console.log(response);
      });
    },
  },
  watch: {},
  computed: {
    reg: function () {
      return function (params) {
        let reg = new RegExp('（', 'g');
        return !reg.test(params);
      }
    }
  }
};
</script>
<style scoped>
.container {
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.single {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: warp;
  margin-bottom: 1em;
}
.single .image {
  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
img {
  width: 100%;
  height: auto;
}
.title {
  width: 100px;
  box-sizing: border-box;
  padding: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.image {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.label {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  border-radius: 0 4px 0 4px;
  background-color: #fb7299;
  color: #ffffff;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  padding: 0 6px;
}
</style>
