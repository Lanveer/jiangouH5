/**
 * Created by lanveer on 2016/9/29.
 */

//阅读更多

$(".show-more").click(function(){


    if($(".jour-detail-some").css('display')=='block'){
                $('.jour-detail-some').hide();
                $(".jour-detail-all").show();
//        $('.show-more>img').src='../'
        $('.up').attr('src', '../imgs/jour/down.png');
    }
    else{
        $('.jour-detail-some').show();
        $(".jour-detail-all").hide();
        $('.up').attr('src', '../imgs/jour/up.png');
    }

});




//判断用户设备

var ua = navigator.userAgent;
if(ua.match(/iPhone|iPod/i) != null){

//    alert("iphone")
}
else if(ua.match(/Android/i) != null){

//    alert('android')
    $(".ticket").css({
//        background:'red'
    })



}
else if(ua.match(/iPad/i) != null){

//    alert('ipad');


}


    function huifu(obj){

var hh= $(obj).parent().next();
//        alert(hh);

        if(hh.css('display')=='block'){
            var box=$(obj).parent().next();
            box.slideUp();
            box.find('.msg').val()=="regfehflhhuhre";

        }else{
            $(obj).parent().next().slideDown();

        }
    }


function say(obj){

    var a= $(obj).parent().next().find('ul>li');
    var userIcon= $(obj).parent().prev().prev().find('.pl-user').html();
    var msg= $(obj).prev().val();

    var ul= $(obj).parent().next().find('ul');
    var user=$(obj).parent().next().find('ul>li').find('.pl-users');
    var des= $(obj).parent().next().find('ul>li').find('.pl-des');
//    输入框失去焦点与获得焦点

var input= $(".msg").val();
    if(msg!=""){
//    user.append(userIcon + ":");
//    des.append(msg);

     var com = '<li>' +
         '<span class="reply-show-user">'+user+'</span>' +
         '<span class="reply-show-info">'+msg+'</span>' +
         '</li>';
        $(".com_ul").append(com);

}else{
    alert('请输入内容');
}


    $(obj).parent().next().slideDown();

}
//回复评论结束












//  图片弹出窗口







//通用轮播图

    $('#demo4').swiper({
        pagination: '#demo4 .swiper-pagination',
        paginationclickable: true,
        spaceBetween: 30,
        nextButton: '#demo4 .swiper-button-next',
        prevButton: '#demo4 .swiper-button-prev',
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
    });




$('#mine').flexslider({
    playAfterPaused: 8000,
    before: function(slider) {
        if (slider._pausedTimer) {
            window.clearTimeout(slider._pausedTimer);
            slider._pausedTimer = null;
        }
    },
    after: function(slider) {
        var pauseTime = slider.vars.playAfterPaused;
        if (pauseTime && !isNaN(pauseTime) && !slider.playing) {
            if (!slider.manualPause && !slider.manualPlay && !slider.stopped) {
                slider._pausedTimer = window.setTimeout(function() {
                    slider.play();
                }, pauseTime);
            }
        }
    }
    // 设置其他参数
});

//评分使用id

//$(function(){
//    rat('star1','result1',10);
//    function rat(star,result,m){
//
//        star= '#' + star;
//        result= '#' + result;
//        $(result).hide();
//
//        $(star).raty({
//            hints: ['10','20', '30', '40', '50','60', '70', '80', '90', '100'],
//            path: "../imgs",
//            starOff: 'star-off-big.png',
//            starOn: 'star-on-big.png',
//            size: 24,
//            start: 40,
//            score: 2,
//            showHalf: true,
//            target: result,
//            targetKeep : true,//targetKeep 属性设置为true，用户的选择值才会被保持在目标DIV中，否则只是鼠标悬停时有值，而鼠标离开后这个值就会消失
//            click: function (score, evt) {
//            }
//        });
//
//
//    }
//
//});





//评分使用类名
//rat1('star2','result2',1);
//function rat1(star,result,m){
//
//    star= '.' + star;
//    result= '.' + result;
//    $(result).hide();
//var h=2;
//    $(star).raty({
//        hints: ['10','20', '30', '40', '50','60', '70', '80', '90', '100'],
//        path: "../imgs",
//        starOff: 'star-off-big.png',
//        starOn: 'star-on-big.png',
//        size: 240,
//        start: 40,
//        score: h,
//        showHalf: true,
//        target: result,
//        targetKeep : true,//targetKeep 属性设置为true，用户的选择值才会被保持在目标DIV中，否则只是鼠标悬停时有值，而鼠标离开后这个值就会消失
//        click: function (score, evt) {
//            //第一种方式：直接取值
////            alert('你的评分是'+score+'分');
//        }
//    });
//}
















//预订须知
$(function(){
    function read(){

    }
});



//评论测试文件

/**
 * Created by an.han on 14-2-20.
 */

window.onload = function () {
    var list = document.getElementById('list');
    var boxs = list.children;

    var timer;

    //格式化日期
    function formateDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        m = m > 9 ? m : '0' + m;
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
    }

    //删除节点
    function removeNode(node) {
        node.parentNode.removeChild(node);
    }

    /**
     * 赞分享
     * @param box 每个分享的div容器
     * @param el 点击的元素
     */
    function praiseBox(box, el) {
        var txt = el.innerHTML;
        var praisesTotal = box.getElementsByClassName('praises-total')[0];
        var oldTotal = parseInt(praisesTotal.getAttribute('total'));
        var newTotal;
        if (txt == '赞') {
            newTotal = oldTotal + 1;
            praisesTotal.setAttribute('total', newTotal);
            praisesTotal.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
            el.innerHTML = '取消赞';
        }
        else {
            newTotal = oldTotal - 1;
            praisesTotal.setAttribute('total', newTotal);
            praisesTotal.innerHTML = (newTotal == 0) ? '' : newTotal + '个人觉得很赞';
            el.innerHTML = '赞';
        }
        praisesTotal.style.display = (newTotal == 0) ? 'none' : 'block';
    }

    /**
     * 发评论
     * @param box 每个分享的div容器
     * @param el 点击的元素
     */
    function reply(box, el) {
        var commentList = box.getElementsByClassName('comment-list')[0];
        var textarea = box.getElementsByClassName('comment')[0];
        var commentBox = document.createElement('div');
        commentBox.className = 'comment-box clearfix';
        commentBox.setAttribute('user', 'self');
        commentBox.innerHTML =
            '<img class="myhead" src="../imgs/jour/user-icon.png" alt=""/>' +
            '<div class="comment-content">' +
            '<p class="comment-text"><span class="user">我：</span>' + textarea.value + '</p>' +
            '<p class="comment-time">' +
            formateDate(new Date()) +
            '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>' +
            '<a href="javascript:;" class="comment-operate">删除</a>' +
            '</p>' +
            '</div>'
        commentList.appendChild(commentBox);
        textarea.value = '';
        textarea.onblur();
    }

    /**
     * 赞回复
     * @param el 点击的元素
     */
    function praiseReply(el) {
        var myPraise = parseInt(el.getAttribute('my'));
        var oldTotal = parseInt(el.getAttribute('total'));
        var newTotal;
        if (myPraise == 0) {
            newTotal = oldTotal + 1;
            el.setAttribute('total', newTotal);
            el.setAttribute('my', 1);
            el.innerHTML = newTotal + ' 取消赞';
        }
        else {
            newTotal = oldTotal - 1;
            el.setAttribute('total', newTotal);
            el.setAttribute('my', 0);
            el.innerHTML = (newTotal == 0) ? '赞' : newTotal + ' 赞';
        }
        el.style.display = (newTotal == 0) ? '' : 'inline-block'
    }

    /**
     * 操作留言
     * @param el 点击的元素
     */
    function operate(el) {
        var commentBox = el.parentNode.parentNode.parentNode;
        var box = commentBox.parentNode.parentNode.parentNode;
        var txt = el.innerHTML;
        var user = commentBox.getElementsByClassName('user')[0].innerHTML;
        var textarea = box.getElementsByClassName('comment')[0];
        if (txt == '回复') {
            textarea.focus();
            textarea.value = '回复' + user;
            textarea.onkeyup();
        }
        else {
            removeNode(commentBox);
        }
    }

    //把事件代理到每条分享div容器
    for (var i = 0; i < boxs.length; i++) {

        //点击
        boxs[i].onclick = function (e) {
            e = e || window.event;
            var el = e.srcElement;
            switch (el.className) {

                //关闭分享
                case 'close':
                    removeNode(el.parentNode);
                    break;

                //赞分享
                case 'praise':
                    praiseBox(el.parentNode.parentNode.parentNode, el);
                    break;

                //回复按钮蓝
                case 'btn':
                    reply(el.parentNode.parentNode.parentNode, el);
                    break

                //回复按钮灰
                case 'btn btn-off':
                    clearTimeout(timer);
                    break;

                //赞留言
                case 'comment-praise':
                    praiseReply(el);
                    break;

                //操作留言
                case 'comment-operate':
                    operate(el);
                    break;
            }
        };

        //评论
        var textArea = boxs[i].getElementsByClassName('comment')[0];

        //评论获取焦点
        textArea.onfocus = function () {

            this.parentNode.className = 'text-box text-box-on';
            this.value = this.value == '评论…' ? '' : this.value;
            this.onkeyup();
        }

        //评论失去焦点
        textArea.onblur = function () {
            var me = this;
            var val = me.value;
            if (val == '') {
                timer = setTimeout(function () {
                    me.value = '评论…';
                    me.parentNode.className = 'text-box';
                }, 200);
            }
        };

        //评论按键事件
        textArea.onkeyup = function () {
            var val = this.value;
            var len = val.length;
            var els = this.parentNode.children;
            var btn = els[1];
            var word = els[2];
            if (len <=0 || len > 140) {
                btn.className = 'btn btn-off';
            }
            else {
                btn.className = 'btn';
            }
            word.innerHTML = len + '/140';
        }

    }
};


