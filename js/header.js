/**
 * Created by 60331 on 2017/3/29.
 */
// header的子目录隐藏与显示
$(document).ready(function () {
    $(".menu").hover(function () {
        $(this).children("ul").slideToggle();
    });
});