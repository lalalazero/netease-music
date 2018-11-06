$(function () {
    $('.icon-pause').on('click',function(){
        $('.disc').removeClass('active');
    });

    $('.icon-play').on('click',function(){
        $('.disc').addClass('active');
    });


})