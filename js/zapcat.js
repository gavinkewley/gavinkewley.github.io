window.onload = function(){
    $("#menu li a").hover(function(){
        $(this).css("background", "url('images/menu-item-bg.gif') repeat-x");
    }, function(){
        $(this).css("background", "");
    });
}