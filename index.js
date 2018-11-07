$(function () {
    $('.tabs  li').on('click',function (e) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var index = $(this).index();
        // 切换tab页面
        $('.tabContent>ul').children().eq(index).addClass('active').siblings().removeClass('active');

    })

    // 获取最新音乐列表
    $.get('./latest_music.json').done(function (result) {
        result.map(function (res,index) {
            var $li = $(".latestMusic>ul").children().eq(index);
            console.log($li);
            $li.find('h4').text(res['name']);
            var s = res['singer'] + '-' + res['album'];
            $li.find('p').text(s);
        })

        $('.loading').remove();
        $('.latestMusic').addClass('active');
    })
})