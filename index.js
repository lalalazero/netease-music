$(function () {
    $('.tabs  li').on('click',function (e) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var index = $(this).index();
        // 切换tab页面
        $('.tabContent>ul').children().eq(index).addClass('active').siblings().removeClass('active');

    })
})