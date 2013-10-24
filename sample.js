$(function(){
    'use strict';

    // true: 小細工あり、false: 小細工なし
    var flg = !location.search.match(/nostate/);

    // 移動
    function move_to_id(id){
        $("html,body").animate({
            scrollTop: $(id).offset().top
        }, 500);

    }

    $("a").on("click", function(e){
        e.preventDefault();

        var hash = $(this).attr("href");

        move_to_id(hash);

        if(flg){
            history.pushState({hash: hash}, null, null);
        }

    });

    $(window).on("popstate", function(e){
        if(e.originalEvent.state){
            move_to_id(e.originalEvent.state.hash);
        } else {
            $("html,body").scrollTop(0);
        }
    });
});
