<template>
  <div>
    <div class="gloss">***以下图片均来自互联网（The following images are from the Internet）***</div>
    <div id="container" @scroll="scrollFn()">
      <div class="box" v-for="(item, index) in imgData.data" :key="index" :style="{top: item.h, left: item.w}">
        <div class="box_img">
          <img :src="item.src" alt />
        </div>
      </div>
    </div>
    <div class="gloss" v-show="loading">正在加载……</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 模拟数据
      imgData: {
        data: []
      },
      img: [
        {
          "src": require("../assets/img/QQ图片20170316160757.png"),
          "w": 1920,
          "h": 1080,
        },
        {
          "src": require("../assets/img/QQ图片20170115163333.png"),
          "w": 636,
          "h": 581,
        },
        {
          "src": require("../assets/img/d4bbcfe06fbfa4830422bfb69647c3c68bb932bc.jpg"),
          "w": 594,
          "h": 779,
        },
        {
          "src": require("../assets/img/243c04f6236254826fcf5fc98b63832d3b150c76.jpg"),
          "w": 585,
          "h": 780,
        },
        {
          "src": require("../assets/img/QQ图片20170327222525.png"),
          "w": 413,
          "h": 574,
        },
        {
          "src": require("../assets/img/9df03d05gy1fdubomad3bj20pk0zu0wp.jpg"),
          "w": 690,
          "h": 968,
        },
        {
          "src": require("../assets/img/3bbb8053gy1fe02txccv2j20bq0kudhh.jpg"),
          "w": 422,
          "h": 750,
        },

      ],
      minHeight: [],
      imgWidth: 0,
      num: 0,
      left_padding: 0,
      loading: true,
    };
  },
  beforeMount() {
    for (let i = 0; i < 8; i++) {
      this.imgData.data.push(...this.img);
    }
    this.imgData = JSON.parse(JSON.stringify(this.imgData));
  },
  mounted () {
    window.onload = () => {
      this.imgLocation("container", "box");
    }
    // 监听滚动条
    window.addEventListener('scroll', this.scrollFn, true);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollFn, true);
  },
  methods: {
    // 图片的加载
    imgLocation (parent, content) {
      let cparent = document.getElementById(parent);
      // 盒子的个数
      let ccontent = this.getChildElement(cparent, content);
      // 每张图片的宽度
      this.imgWidth = ccontent[0].offsetWidth;
      // let imgWidth = 132;
      // 一行多少图
      this.num = Math.floor(cparent.offsetWidth / this.imgWidth) - 1;
      // 左边距
      this.left_padding = (cparent.offsetWidth - this.imgWidth * this.num) / (this.num - 1);
      for (let j = 0; j < this.num; j++) {
        this.minHeight[j] = 0;
      }
      for (let i = 0; i < ccontent.length; i++) {
        //取第一行中高度的最小值
        let minHeight = Math.min.apply(null, this.minHeight);
        // 最小高度值的位置
        let minIndex = this.minHeight.indexOf(minHeight);
        // 图片的位置
        this.imgData.data[i].w = (this.imgWidth + this.left_padding) * minIndex + 'px';
        this.imgData.data[i].h = minHeight + 10 + 'px';
        // 最低图片
        this.minHeight[minIndex] = this.minHeight[minIndex] + ccontent[i].offsetHeight + 10;
      }
      cparent.style.height = Math.max.apply(null, this.minHeight) + 'px';
    },
    // 得到最小高度图片的位置
    getMinHeightLocation (boxHeightArr, minHeight) {
      for (let i in boxHeightArr) {
        if (boxHeightArr[i] == minHeight) {
          return i;
        }
      }
    },
    // 得到图片信息
    getChildElement (parent, content) {
      let contentArr = [];
      let allcontent = parent.getElementsByTagName("*");
      // 将信息储存到数组中
      for (let i = 0; i < allcontent.length; i++) {
        if (allcontent[i].className == content) {
          contentArr.push(allcontent[i]);
        }
      }
      return contentArr;
    },
    scrollFn () {
      let that = this;
      if (Math.floor(document.documentElement.scrollTop + window.innerHeight + 100) >= document.body.offsetHeight) {
        that.imgData.data.push(...that.img);
        that.imgData = JSON.parse(JSON.stringify(that.imgData));
        for (let i = that.imgData.data.length - 7; i < that.imgData.data.length; i++) {
          //取第一行中高度的最小值
          let minHeight = Math.min.apply(null, that.minHeight);
          // 最小高度值的位置
          let minIndex = that.minHeight.indexOf(minHeight);
          // 图片的位置 * minIndex + "px";
          that.imgData.data[i].w = (that.imgWidth + that.left_padding) * minIndex + 'px';
          that.imgData.data[i].h = minHeight + 10 + 'px';
          // 盒子的个数
          let ccontent = that.getChildElement(document.getElementById("container"), "box");
          that.minHeight[minIndex] = that.minHeight[minIndex] + ccontent[i%7].offsetHeight + 10;
          document.getElementById('container').style.height = Math.max.apply(null, this.minHeight) + 'px';
        }
      }
    }
  },
  watch: {},
  computed: {},
}
</script>
<style scoped>
/*主要内容*/
.gloss {
  color: #cccccc;
  font-size: 0.75em;
  margin: 0.5em auto;
  text-align: center;
}

#container {
  position: relative;
  width: 100%;
}

/*瀑布流每一张图*/
.box {
  padding: 5px;
  width: 120px;
  border: 1px solid #cccccc;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
  font-size: 0;
  position: absolute;
}

.box img {
  width: 120px;
  height: auto;
}
</style>