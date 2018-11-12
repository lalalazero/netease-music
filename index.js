$(function () {

    var historySearch = [];
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

    $('#form').on('submit',function () {
        this.preventDefault();
    })

    $('#clearInputIcon').on('click',function () {
        $('#search').val('');
        hideSearchSuggestions();
    })

    $('#search').on('input',function () {
         var keyword = $(this).val().trim();
        if(keyword.length > 0){

            document.querySelector('#clearInputIcon').classList.add('show');
            hiddeHotSearch();
            $('.suggestSearch>h3').text('搜索"' + keyword + '"');
            // 函数节流控制
            addToHistory(keyword);
            searchSongs(keyword).then((res)=>{
                showSearchSuggestions(res);
            });

        }else {
            document.querySelector('#clearInputIcon').classList.remove('show');
            hideSearchSuggestions();
            showHotSearch();
        }

    })


    function showSearchSuggestions(res) {
        $('.suggestSearch>ul').empty();
        if(res.length > 0){
            res.forEach(function (value) {
                var $li = $('<li> <svg class="icon searchIcon">' +
                    '<use xlink:href="#icon-search"></use>' +
                    '</svg>' + '<p>搜索建议1</p>' + '</li>');
                $li.find('p').text(value.name);
                $('.suggestSearch>ul').append($li);
            })
        }
        $('.suggestSearch').addClass('show');


    }

    function hideSearchSuggestions() {
        $('.suggestSearch>ul').empty();
        $('.suggestSearch').removeClass('show');
        $('.suggestSearch>h3').text('搜索');

    }

    function showHotSearch() {
        makeHistorySearch();
        $('.hotSearch').removeClass('hide');
    }
    function hiddeHotSearch() {
        $('.hotSearch').addClass('hide');
    }

    function addToHistory(keyword) {
        // 如果原来搜索过该关键字，把它删掉再重新插入到数组最后，保证最新的搜索总是在最后
        var index = historySearch.find(function (value) {
            return value.indexOf(keyword) >= 0
        })
        if(index !== undefined && index !== historySearch.length - 1){
            historySearch.splice(index, 1);
            historySearch.push(keyword);
        }else{
            // 新的关键字直接push到数组最后
            historySearch.push(keyword);
        }

    }
    function makeHistorySearch() {
        $('.history>ul').empty();
        historySearch.forEach(function (value) {
            var $li = $('<li><svg class="icon clock"><use xlink:href="#icon-Clock"></use></svg>' +
                '<p>吴亦凡新专辑</p><svg class="icon delete"><use xlink:href="#icon-delete"></use></svg></li>');
            $li.find('p').text(value);
            // 倒序插入，显示最近的搜索在最前
            $('.history>ul').prepend($li);
        })
    }


    // 模拟后台请求
    function searchSongs(keyword){
        // es6 的箭头函数
        return new Promise((resolve, reject)=>{
            var database = [
                {
                    'id':1,
                    'name':'那些花儿'
                },
                {
                    'id':2,
                    'name':'情非得已'
                },
                {
                    'id':3,
                    'name':'找自己'
                },
                {
                    'id':4,
                    'name':'black space style'
                },
                {
                    'id':5,
                    'name':'那些花儿2'
                },
                {
                    'id':6,
                    'name':'那些花儿3'
                },


            ];
        let result = database.filter(function (value) {
            return value.name.indexOf(keyword) >= 0;
        });

        setTimeout(function () {
            resolve(result);
        }), (Math.random()*1000 + 1000)}


        );

    }





})