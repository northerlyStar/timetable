<template>
  <div class="map">
    <div id="container"></div>
  </div>
</template>

<script>
import loadMap from '../assets/js/map.js'
export default {
  data () {
    return {
    };
  },
  mounted () {
    loadMap().then(loadMap => {
      console.log('地图加载成功！');
      this.mapConfig();
    }).catch(() => {
      console.log('地图加载失败');
    })
  },
  methods: {
    mapConfig () {
      let map = new AMap.Map('container');
      map.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.CitySearch'], function () {
        // 工具条
        let toolBar = new AMap.ToolBar();
        map.addControl(toolBar);
        // 比例尺
        let scale = new AMap.Scale();
        map.addControl(scale);
      })

      map.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//高精度
          timeout: 10000,//超时
          noIpLocate: 0,//0：可以使用IP定位；1：手机设备废除IP定位；2：PC废除IP定位；3：所有终端禁止使用IP定位
          noGeoLocation: 0,//like up
          GeoLocationFirst: false,//浏览器定位首选
          maximumAge: 0,
          convert: false,
          showMarker: true,
          showButton: true,
          buttonPosition: 'RB',
          markerOptions: true,
          zoomToAccuracy: true,
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
      })
    }
  },
  watch: {},
  computed: {},
}
</script>
<style scoped>
.map {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}
#container {
  height: 100%;
  margin: 0;
}
</style>