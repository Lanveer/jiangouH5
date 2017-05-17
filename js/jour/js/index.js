/**
 * Created by lanveer on 2016/12/6.
 */


//页面加载完成之后执行ajax请求

window.onload= function(){
    var jour_url=webUrl+'travel/main/traveldetails';
    $.ajax({
        type:'post',
        dataType:'json',
        url:jour_url,
        data:{id:stringId,user_id:userId,lat:30.546537,lng:104.064182},
        success:function(msg){
                distance= msg.data.data.distance,
                id=msg.data.data.id,
                introduce=msg.data.data.introduce,
                operate_time=msg.data.data.operate_time,
                operate_week=msg.data.data.operate_week,
                rating=msg.data.data.rating,
                sale_num=msg.data.data.sale_num,
                tel=msg.data.data.tel,
                title=msg.data.data.title;
            $('.nickName').html(msg.data.data.nickname);
            $(".top-title,.Mask_title").html(title);
            $('.distance').html(distance);
            $(".operate_time").html(operate_time);
            $(".operate_week").html(operate_week);
            $(".tel").html(tel);
            $(".rating").html(rating);
            $(".section_description").html(introduce);
            $(".transform-id,.com_id").html(id);
            $('.where').html(msg.data.data.address);

            //提交回复需要的参数
            try{
                receive_user_id= msg.data.commend.comments.sent_user_id;
                receive_nickname=msg.data.commend.comments.nickname;
                comment_id=msg.data.commend.comments.id;
            }catch(e){
                console.log(e)
            }


            //图片轮播开始
            var ns=msg.data.img;
            var lunbo='';
            var lunbo_big='';
            $.each(ns,function(a,b){
                lunbo += "<div class='swiper-slide'><img onclick='showBigImg()' src='"+ b.image +largeImg +"' alt=''/></div>";
                lunbo_big += "<div class='swiper-slide'><img onclick='closeImg()' src='"+ b.image+ largeImg+ "' alt=''/></div>";
            });
            $("#small_play").append(lunbo);
            $("#big_play").append(lunbo_big);


            //买票处理
            var tickets= msg.data.reserve;
            var ticket_str='';
            $.each(tickets,function(c,d){
                ticket_str+='<li>' +
                    '<div class="ticket-left am-fl"><span>票</span></div>' +
                    '<div class="ticket-mid am-fl"><h1>'+ d.title+'</h1>' +
                    '<span onclick="showTip(this)">预订须知  &gt;</span>' +
                    '<span class="use_id" style="display: none;">'+ d.id+'</span>'+
                    '<span class="use_money" style="display: none;">'+ d.price+'</span>'+
                    '</div>'+
                    '<div class="ticket-right am-fr">' +
                    '<h3><span>$</span><span class="privilege_price">'+ d.privilege_price+'</span></h3>' +
                    '<h2><span>$</span><span class="price">'+ d.price+'</span> <span style="display: none" class="money">'+ d.price+'</span><span style="display: none" class="ticket-id">'+ d.id+'</span></h2>' +
                    '<button class="ticket-pay" onclick="travelOrder(this)">支付</button>' +
                    '</div>';
                '</li>'
            });
            $(".ticket").append(ticket_str);


            //评论数据获取
            try{
                var comment_num= msg.data.commend.answer.length;
                var is_comment=msg.data.commend;
                if(is_comment==''){
                    $('#pinglun').html('暂时没有评论哈！');
                    return;
                }else{
                    var coms=msg.data.commend.comments;

                    var coms_img=msg.data.commend.comments_img;

                    //没有评论图片的时候暂时隐藏图片的box
                    var flag= msg.data.commend.comments_img;
                    if(flag.length==0){
                        //$('.show_imgs').hide()
                    }else if(flag.length!=0){
                        $('.show_imgs').show()
                    }

                    //评论动态添加数据
                    var jour_str='';
                    var lunbo_big='';
                    $.each(coms_img,function(a,m){
                        jour_str+='<li onclick="showBigImg1()"><img  src="'+ m.image+smallImg +'" alt=""/></li>';
                        lunbo_big += "<div class='swiper-slide'><img onclick='closeImg()' src='"+ m.image +largeImg+ "' alt=''/></div>";
                    });
                    $("#com_play").append(lunbo_big);
                    $(".Mask_title1").html(coms.comments);

                    // 处理回复列表
                    var coms_info=msg.data.commend.answer;
                    var ans_str='';
                    $.each(coms_info,function(r,t){
                        ans_str+='<li>' +
                            '<span class="icon"><img src="../imgs/basic/meishi/msg_icon.png" alt=""/></span>' +
                            '<span class="com_name">'+t.sent_nickname+':</span>' +
                            '<span class="com_content">'+t.comments+'</span>' +
                            '</li>'
                    });

                    var jour_list='';
                    jour_list+='<li>' +
                        '<div class="com_header">' +
                        '<div class="icon_div"><img class="am-circle" src='+coms.header_img+' alt=""/></div>' +
                        '<div class="user_info">' +
                        '<span class="users">'+coms.nickname+'</span>' +
                        ' <p style="text-align: left;font-size: 9pt">3小时前</p>' +
                        ' </div>' +
                        '<div class="coms"><p>'+coms.comments+'</p></div>' +
                        '</div>' +
                        '<div class="com_body">' +
                        '<div class="show_imgs"><ul>'+jour_str+'</ul></div>' +
                        '<div class="com_body_info">'+
                        '<ul>' +
                        '<li class="comments_li" style="margin-left:3%;">评论 <span class="comments">('+comment_num+')</span></li>' +
                        '<li class="rep" onclick="do_com(this)"><img src="../imgs/basic/jour/rep.png" alt=""/>回复</li>' +
                        '</ul>' +
                        '</div>'+
                        '<div class="input_area">' +
                        '<div name="" class="input-box"><textarea name="" class="input"></textarea></div>' +
                        '<button class="reply" onclick="reply(this)">提交</button>' +
                        '</div>' +
                        '</div>' +
                        '<div class="com_footer">' +
                        '<span class="receive_user_id">'+receive_user_id+'</span>'+
                        '<span class="receive_nickname">'+receive_nickname+'</span>'+
                        '<span class="comment_id">'+comment_id+'</span>'+
                        '<ul class="com_footer_ul">' +ans_str+
                        '</ul>' +
                        '</div>' +
                        '</li>';
                    $("#pinglun").append(jour_list);
                }
            }catch(e){
                console.log(e)
            }
        },
        error:function(error){
            if(error.status==404){console.log('页面未找到')}else if(error.status==500){console.log("服务器内部错误！")}
        }
    })

};

//点击跳转

function transform(obj){
    var id= $(obj).prev().html();
    window.location.href = "gonglve.html?id="+id;
}

function com_transform(obj){
var id= $(obj).find('.com_id').html();
    console.log(id);
    window.location.href = "pinglun.html?id="+id +'&userId='+userId;
}





//点击预订须知
function showTip(obj){
    $('.tips').slideDown(200);
    $('#mask').show();
    $(".tips").css({
        position:'fixed',
        bottom:0,
        zIndex:'999999'
    });
    var use_id= $(obj).next().html();
    var money= $(obj).parent().next().find('.money').html();
    var book_url=webUrl+'travel/main/bookingnotice';
    $.ajax({
        type:'post',
        dataType:'json',
        url:book_url,
         data:{id:use_id,user_id:userId},
        success:function(msg){
            $(".tips-body>h1").html(msg.data.title);
            $('.profit>dd').html(msg.data.attractions);
            $('.ticket-fee>dd').html(msg.data.cost_description);
            $('.refound>dd').html(msg.data.refund);
            $(".money").html(msg.data.price);
            $('.ticket-id').html(msg.data.travel_price_id);
            var is_collect=msg.data.collect_status;
            var title= msg.data.title;
            is_coll(is_collect);
            collect(userId,title,url,8,stringId,is_collect)
        },
        error:function(error){
            if(error.status==500){
             console.log('预定须知服务器错误！')
            }
        }
    })
}


$('.close,#mask').click(function(){
    $('.tips').slideUp(200);
    $("#mask").hide();
});


//订单
function travelOrder(obj){
var money= $(obj).prev().find('.money').html();
var ticket_id= $(obj).prev().find('.ticket-id').html();

    if(url.indexOf('android')!=-1){
        javascript:android.travelOrder(ticket_id,money);
    }else if(url.indexOf('ios')!=-1){
        window.location.href="travelOrder://" + ticket_id +'&'+ money;
    }
}

//分享
function fenxiang(){
    if(url.indexOf('android')!=-1){
        javascript:android.share(url);
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "fenxiang://" +url;
    }
}




//评论的回复功能


function reply(obj){
    var nickName=$('.nickName').html();
    var id=stringId;
    var user_id=userId;
    var comments=$(obj).prev().find('.input').val();
    var receive_user_id=$(obj).parent().parent().next().find('.receive_user_id').html();
    var receive_nickname=$(obj).parent().parent().next().find('.receive_nickname').html();
    var comment_id=$(obj).parent().parent().next().find('.comment_id').html();
    var par_ul=$(obj).parent().parent().next().find(".com_footer_ul");
    var com_info='';
    console.log(comments);
    console.log(receive_user_id);
    console.log(receive_nickname);
    console.log(comment_id);
    if($.trim(comments)==''){
        alert("请先输入评论后再提交！");
        return;
    }else{
        var sub_url=webUrl+'travel/main/answer';
        $.ajax({
            type:'post',
            dataType:'json',
            url:sub_url,
                      data:{id:stringId,user_id:userId,comments:comments,receive_user_id:receive_user_id,receive_nickname:receive_nickname,comment_id:comment_id},
//            data:{id:1,user_id:98,comments:comments,receive_user_id:1,receive_nickname:'ni',comment_id:137},
            success:function(msg){
                com_info+='<li>' +
                    '<span class="icon"><img src="../imgs/basic/jour/msg_icon.png" alt=""/></span>' +
                    '<span class="com_name">'+nickName+'</span>' +
                    '<span class="com_content">'+comments+'</span>' +
                    '</li>';
                par_ul.append(com_info);
                $(obj).prev().val('');
                $(obj).parent().hide();
            },
            error:function(error){
                if(error.status==404){console.log('页面为找到')}else if(error.status==500){console.log("服务器内部错误！")}
            }
        });
    }

 };





//点击返回按钮
function goBack(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='back://';
    } else if (/android/.test(ua)) {
        javascript:android.goBack()
    }
}




