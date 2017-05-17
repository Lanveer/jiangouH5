

/**
 * Created by Administrator on 2017/1/11.
 */


function goBack(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='back://';
    } else if (/android/.test(ua)) {
        javascript:android.goBack()
    }
}

$(function(){
    var aMenuOneLi = $(".menu-one > li");
    var aMenuTwo = $(".menu-two");
    $(".menu-one > li > .header").each(function (i) {
        $(this).click(function () {
            if ($(aMenuTwo[i]).css("display") == "block") {
                $(aMenuTwo[i]).slideUp(300);
                $(aMenuOneLi[i]).removeClass("menu-show")
            } else {
                for (var j = 0; j < aMenuTwo.length; j++) {
                    $(aMenuTwo[j]).slideUp(300);
                    $(aMenuOneLi[j]).removeClass("menu-show");
                }
                $(aMenuTwo[i]).slideDown(300);
                $(aMenuOneLi[i]).addClass("menu-show")
            }
        });
    });
});