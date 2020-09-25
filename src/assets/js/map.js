export default function loadMap (key = '35b86c43d7c85cff6285ce9f6987062a', v = '1.4.15') {
  return new Promise(function (resolve, reject) {
    if (typeof AMap !== 'undefined') {
      resolve(AMap);
      return true;
    } else {
      reject('map error');
    }
    window.onCallback = function () {
      resolve(AMap);
    }
    // 引入高德地图API
    const newScript = document.createElement('script');
    newScript.charset = 'utf-8';
    // newScript.setAttribute('type', 'text/javascript');
    newScript.src = `https://webapi.amap.com/maps?v=${v}&key=${key}&callback=onCallback`;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(newScript);
  })
};
