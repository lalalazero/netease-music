$(function () {

    var index = parseInt(location.search.match(/\bid=([0-9]*)/)[1], 10);

    $.get('./songs.json').done(function (res) {
        var obj = res[index];
        loadResource(obj);
    })

    var audio = new Audio();

    function loadResource(obj) {
        $('.cover')[0].src = obj['album'];
        $('.page').css('background-image','url(' + obj['background'] + ')');
        audio.src = obj['mp3'];
        $('.lyrics>h3').text(obj['name'] + '-' + obj['author']);
        var lyric = obj['lyric'].split('\n');
        lyric.forEach(function (value) {
            $('.lyrics').append('<p>' + value + '</p>');
        })

    }
    $('.icon-pause').on('click',function(){
        $('.disc').removeClass('active');
        pauseMusic();
    });

    $('.icon-play').on('click',function(){
        $('.disc').addClass('active');
        playMusic();
    });

    function playMusic() {
        audio.play();
    }
    function pauseMusic() {
        audio.pause();
    }



})