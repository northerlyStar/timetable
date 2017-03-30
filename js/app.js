// 瀑布流
window.onload=function () {
    imgLocation("container","box");
    // 模拟数据
    var imgData={"data":[
        {"src":"QQ图片20170115163333.png"},
        {"src":"QQ图片20170316160757.png"},
        {"src":"QQ图片20170327222525.png"},
        {"src":"d4bbcfe06fbfa4830422bfb69647c3c68bb932bc.jpg"},
        {"src":"9df03d05gy1fdubomad3bj20pk0zu0wp.jpg"},
        {"src":"3bbb8053gy1fe02txccv2j20bq0kudhh.jpg"},
        {"src":"243c04f6236254826fcf5fc98b63832d3b150c76.jpg"}
    ]};
    // 监听滚动条
    window.onscroll = function () {
        if (checkFlag()){
            var cparent = document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
                var ccontent = document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className="box_img";
                ccontent.appendChild(boximg);
                var img=document.createElement("img");
                img.src="img/"+imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box")
        }
    }
}
// 图片的无限加载
function checkFlag() {

    var cparent = document.getElementById("container");
    // 得到具体内容
    var ccontent = getChildElement(cparent,"box");
    // 最后一张图片距顶部的高度
    var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
    // 滑动的距离
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    // 浏览器的高度
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    if (lastContentHeight<scrollTop+pageHeight){
        return true;
    }
}
// 图片的加载
function imgLocation(parent,content) {
    var cparent=document.getElementById(parent);
    // 盒子的个数
    var ccontent = getChildElement(cparent,content);
    // 每张图片的宽度
    var imgWidth = ccontent[0].offsetWidth;
    // 一行多少图
    var num = Math.floor(document.documentElement.clientWidth/imgWidth);
    // 瀑布流容器宽度及居中
    cparent.style.cssText="width:"+imgWidth*num+"px;margin: 0 auto";
    // 承载第一行所有图片的高度
    var boxHeightArr = [];
    for(var i = 0; i<ccontent.length; i++){
        // 只承载第一行的高度
        if(i<num){
            boxHeightArr[i] = ccontent[i].offsetHeight;
        }else{
            //取第一行中高度的最小值
            var minHeight=Math.min.apply(null,boxHeightArr);
            // 最小高度值的位置
            var minIndex=getMinHeightLocation(boxHeightArr,minHeight);
            // 图片的位置
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minHeight+"px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }
}
// 得到最小高度图片的位置
function getMinHeightLocation(boxHeightArr,minHeight) {
    for(var i in boxHeightArr){
        if (boxHeightArr[i]==minHeight){
            return i;
        }
    }
}
// 得到图片信息
function getChildElement(parent,content) {
    var contentArr = [];
    var allcontent=parent.getElementsByTagName("*");
    // 将信息储存到数组中
    for(var i = 0; i<allcontent.length; i++){
        if (allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}