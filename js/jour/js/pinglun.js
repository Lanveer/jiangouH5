/**
 * Created by lanveer on 2016/12/6.
 */


//加载评论列表
window.onload = function(){
    var userInfo_url=topic_url+'user/tourist/getbirthandsex';
    $.ajax({
        type:'post',
        dataType:'json',
        data:{user_id:userId},
        url:userInfo_url,
        success:function(msg){
            console.log(msg);
            var nickName= msg.data.nickname;
            $(".nickName").html(nickName)

        },
        error:function(error){
            if(error.status==500){
                console.log('server internal error')
            }
        }
    });


    var com_list=webUrl+'travel/main/travelcomment';
    $.ajax({
        type:'post',
        dataType:'json',
        url:com_list,
      data:{id:stringId,pages:1},
        success:function(msg){
            console.log(msg);
            var coms=msg.data;
            var com_str='';
            var ans_str='';
            var com_play='';

            $.each(coms,function(a,item){
                var com_imgs=item.comment.img;
                var list='';
                var lunbo_big='';
                $.each(com_imgs, function(a,b){
                    list+='<li onclick="showBigImg()"><img  src="'+ b.image+smallImg +'" alt=""/></li>';
                    lunbo_big += "<div class='swiper-slide'><img onclick='closeImg()' src='"+ b.image + largeImg +"' alt=''/></div>";
                });
                $("#big_play").append(lunbo_big);

                // 处理评论的回复列表
                var com_ans= item.child_comment;
                var ans_str='';
                $.each(com_ans,function(r,t){
//                    console.log(t)
                    ans_str+='<li>' +
                        '<span class="icon"><img src="../imgs/basic/meishi/msg_icon.png" alt=""/></span>' +
                        '<span class="com_name">'+ t.sent_nickname+'</span>' +
                        '<span class="com_content">'+ t.comments+'</span>' +
                        '</li>'
                });

                //提交回复需要的参数
                receive_user_id= item.comment.sent_user_id;
                receive_nickname= item.comment.nickname;
                comment_id= item.comment.id;
                comment_num=item.child_comment.length;

                com_str+='<li>' +
                    '<div class="com_header">' +
                    '<div class="icon_div"><img class="am-circle" src='+item.comment.header_img+' alt=""/></div>' +
                    '<div class="user_info">' +
                    '<span class="users">'+item.comment.nickname+'</span>' +
                    ' <p style="text-align: left;font-size: 9pt;">'+item.comment.create_time+'</p>' +
                    ' </div>' +
                    '<div class="coms"><p>'+item.comment.comments+'</p></div>' +
                    '</div>' +
                    '<div class="com_body">' +
                    '<div class="show_imgs"><ul>'+list+'</ul></div>' +
                    '<div class="com_body_info">' +
                    '<ul>' +
                    '<li class="comments_li">评论 <span class="comments">('+comment_num+')</span></li>' +
                    '<li class="rep" onclick="do_com(this)"><img src="../imgs/basic/jour/rep.png" alt=""/>回复</li>' +
                    '</ul>' +
                    '</div>'+
                    '<div class="input_area">' +
                    '<div name="" class="input-box"><textarea name="" id="" class="input"></textarea></div>' +
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

            });
            $("#pinglun").append(com_str);

            //没有评论图片的时候暂时隐藏图片的box
            $.each(coms,function(a,item){
                var img_flag=item.comment.img.length;
                if(img_flag==0){
//                    $('.show_imgs').hide()
                }else if(img_flag!=0){
                    $('.show_imgs').show()
                }
            });


        },
        error:function(error){
            if(error.status==400){
                console.log("页面未找到")
            }else if(error.status==500){
                console.log('服务器内部错误')
            }
        }
    })

};




//回复评论内容

function reply(obj){
    //    回复需要得参数

    var nickName=$('.nickName').html();
    var id=stringId;
    var user_id=userId;
    var comments=$(obj).prev().find('.input').val();
    var par_ul=$(obj).parent().parent().next().find(".com_footer_ul");
    var receive_user_id=$(obj).parent().parent().next().find('.receive_user_id').html();
    var receive_nickname=$(obj).parent().parent().next().find('.receive_nickname').html();
    var comment_id=$(obj).parent().parent().next().find('.comment_id').html();
    console.log(receive_user_id);
    console.log(receive_nickname);
    console.log(comment_id);
    var com_info='';
    if($.trim(comments)==''){
        alert("请先输入评论后再提交！");
        return;
    }else{
        var sub_url=webUrl+'travel/main/answer';
        $.ajax({
            type:'post',
            dataType:'json',
            url:sub_url,
          data:{id:stringId,user_id:userId,comments:comments,receive_user_id:1,receive_nickname:receive_nickname,comment_id:comment_id},
//            data:{id:2,user_id:1,comments:comments,receive_user_id:1,receive_nickname:receive_nickname,comment_id:comment_id},
            success:function(msg){
                com_info+='<li>' +
                    '<span class="icon"><img src="../imgs/basic/jour/msg_icon.png" alt=""/></span>' +
                    '<span class="com_name">'+nickName+'</span>' +
                    '<span class="com_content">'+comments+'</span>' +
                    '</li>';
                par_ul.append(com_info);
                $(obj).prev().find('.input').val('');
                $(obj).parent().hide();
       },error:function(error){
                if(error.status==404){console.log('页面未找到')}else if(error.status==500){console.log("服务器内部错误！")}
            }
        })
    }
}


//点击返回按钮
function goBack(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='back://';
    } else if (/android/.test(ua)) {
        javascript:android.goBack()
    }
}




