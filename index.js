$(function () {

    loadLatestMusic();

    $('.tabs  li').on('click',function (e) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var index = $(this).index();

        // 切换tab页面
        $('.tabContent>ul').children().eq(index).addClass('active').siblings().removeClass('active');

        if(index === 1){
            loadHotMusic();
        }

    })

    // 获取最新音乐列表
    function loadLatestMusic() {
        var $ul = $(".playList .latestMusic>ul");
        if($ul.attr('dataLoaded') === 'yes'){ return;}

        $.get('./latest_music.json').done(function (result) {
            result.map(function (res,index) {
                var $li = $ul.children().eq(index);
                $li.find('h4').text(res['name']);
                var s = res['singer'] + '-' + res['album'];
                $li.find('p').text(s);
                if(res['sq'] === 1){
                    var icon = '<svg class="icon sq_icon"><use xlink:href="#icon-ttpodicon"></use></svg>';
                    $li.find('p').prepend(icon);
                }
            })

            $('.playList .loading').remove();
            $('.playList .latestMusic').addClass('active');
            $ul.attr('dataLoaded','yes');
        })
    }
    // 获取热歌榜
    function loadHotMusic() {
        var $ul = $('.hotList .musicList');
        if($ul.attr('dataLoaded') === 'yes'){ return; }

        $.get('./hot_music.json').done(function (result) {
            result.map(function (value,index) {
                var $li = $ul.children().eq(index);
                $li.find('h4').text(value['name']);
                var s = value['singer'] + '-' + value['album'];
                $li.find('p').text(s);
                if(value['sq'] === 1){
                    var icon = '<svg class="icon sq_icon"><use xlink:href="#icon-ttpodicon"></use></svg>';
                    $li.find('p').prepend(icon);
                }

            })
            $ul.attr('dataLoaded','yes');
            $('.hotList .loading').remove();
            $('.hotList .musicList').addClass('active');

        })
    }

    $('#clearInputIcon').on('click',function () {
        $('#search').val('');
        hideSearchSuggestions();
    })

    $('#search').on('input',function () {

        if($(this).val().trim().length > 0){
            hiddeHotSearch();
            $('.suggestSearch>h3').text('搜索"' + $(this).val().trim() + '"');
            showSearchSuggestions();

        }else {
            hideSearchSuggestions();
            showHotSearch();
        }

    })

    function showSearchSuggestions() {
        $('.suggestSearch').addClass('show');
        document.querySelector('#clearInputIcon').classList.add('show');

    }

    function hideSearchSuggestions() {
        $('.suggestSearch').removeClass('show');
        $('.suggestSearch>h3').text('搜索');
        document.querySelector('#clearInputIcon').classList.remove('show');
    }

    function showHotSearch() {
        $('.hotSearch').removeClass('hide');
    }
    function hiddeHotSearch() {
        $('.hotSearch').addClass('hide');
    }





})