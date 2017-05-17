/**
 * Created by lanveer on 2016/12/6.
 */

window.onload= function(){
         var userInfo_url=topic_url+'user/tourist/getbirthandsex';
     $.ajax({
         type:'post',
         dataType:'json',
         data:{user_id:userId},
//         data:{user_id:135},
         url:userInfo_url,
         success:function(msg){
             var nickName= msg.data.nickname;
             $(".nickName").html(nickName)

         },
         error:function(error){
             if(error.status==500){
                 console.log('server internal error')
             }
         }
     });


    var com_list=webUrl+'nearfood/main/comment';
    $.ajax({
        type:'post',
        dataType:'json',
        url:com_list,
        data:{id:stringId,user_id:userId,pages:1},
        success:function(msg){
            var coms=msg.data;
            var com_str='';
            var ans_str='';
            var com_play='';
            $.each(coms,function(a,b){
//                console.log(b.data);
                //提交回复需要的参数
                receive_user_id= b.data.comments.sent_user_id;
                receive_nickname=b.data.comments.nickname;
                comment_id=b.data.comments.id;


                //处理评论中图片列表
                var com_imgs= b.data.comments_img;
                var com_ans= b.data.answer;
                var com_img='';
                var com_play='';
                $.each(com_imgs,function(h,k){
                  com_img+='<li><img  onclick="showBigImg1()" src='+ k.img+smallImg+' alt=""/></li>'
                  com_play += "<div class='swiper-slide'><img onclick='closeImg()' src='"+ k.img +largeImg+ "' alt=''/></div>";
                });
                $("#com_play").append(com_play);
//                $(".Mask_title1").html();

                // 处理评论的回复列表
                var ans_str='';
                $.each(com_ans,function(r,t){
                    ans_str+='<li>' +
                        '<span class="icon"><img src="../imgs/basic/meishi/msg_icon.png" alt=""/></span>' +
                        '<span class="com_name">'+ t.sent_nickname+'</span>' +
                        '<span class="com_content">'+ t.comments+'</span>' +
                        '</li>'
                });


                // 评论列表的星星数量
                    var comments= b.data.comments;
                    var comment_num= b.data.comment_num;
                    var browse=comments.browse;
                    var stars=comments.score;
                    var stars_str='';
                    for(var i=0;i<5;i++){
                    if(i<stars){
                        stars_str+='<li><img src="../imgs/basic/star-on-big.png" alt=""/></li>';
                    }else{
                        stars_str+='<li><img src="../imgs/basic/star-off-big.png" alt=""/></li>';
                    }
                };

                //评论列表的显示
                console.log(comments.parise_status);

                com_str+='<li>' +
                    '<div class="com_header">' +

                    '<div class="icon_div"><img class="am-circle" src='+comments.header_img+' alt=""/></div>' +
                    '<div class="user_info">' +
                    '<span class="users">'+comments.nickname+'</span>' +
                    ' <div class="score"><span>打分:</span><ul>'+stars_str+'</ul></div>' +
                    '</div>' +
                    '<div class="coms"><p>'+comments.comments+'</p></div>' +
                    '</div>' +
                    '<div class="com_body">' +
                    '<div class="show_imgs"><ul>'+com_img+'</ul></div>' +
                    '<div class="com_body_info">' +
                    '<ul>';
                if(comments.parise_status==0){
                    com_str+='<li class="browse_li praise" onclick="praise(this)"><span class="browse zan">'+ comments.parise+'</span> <span  style="display: none" class="use_id">'+ comments.id+'</span> <span class="praise_status" style="display: none">'+ comments.parise_status+'</span></li>'
                }else if(comments.parise_status==1){
                    com_str+='<li class="browse_li praise2" onclick="praise(this)"><span class="browse zan">'+ comments.parise+'</span> <span  style="display: none" class="use_id">'+ comments.id+'</span> <span class="praise_status" style="display: none">'+ comments.parise_status+'</span></li>'
                };
//                '<li class="browse_li praise"><span class="browse zan">'+browse+'</span></li>' +
                com_str+= '<li class="comments_li">评论<span class="comments">'+comment_num+'</span></li>' +
                    '<li class="data">' +
                    '<span class="receive_user_id"></span>' +
                    '<span class="receive_nickname"></span>' +
                    '<span class="comment_id"></span>' +
                    '</li>' +
                    '<li class="rep" onclick="do_com(this)"><img src="../imgs/basic/meishi/rep.png" alt=""/>回复</li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="input_area"> ' +
                    '<textarea name="" class="input"></textarea>' +
                    '<button class="reply" onclick="reply(this)">提交</button>'+
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

        },error:function(error){
            if(error.status==404){
                console.log('页面未找到')
            }else if(error.status==500){
                console.log("服务器内部错误！")
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
    var comments=$(obj).prev().val();
    var par_ul=$(obj).parent().parent().next().find(".com_footer_ul");
    var receive_user_id=$(obj).parent().parent().next().find('.receive_user_id').html();
    var receive_nickname=$(obj).parent().parent().next().find('.receive_nickname').html();
    var comment_id=$(obj).parent().parent().next().find('.comment_id').html();
    console.log(receive_user_id);
    console.log(receive_nickname);
    console.log(comment_id);
    var com_info='';
    if($.trim(comments)==''){
        showTips('请先输入再提交！');
        autoCloseTips();
        return;
    }else{
        var sub_url=webUrl+'nearfood/main/commentanswer';
        $.ajax({
            type:'post',
            dataType:'json',
            url:sub_url,
            data:{id:stringId,user_id:userId,comments:comments,receive_user_id:receive_user_id,receive_nickname:receive_nickname,comment_id:comment_id},
//            data:{id:2,user_id:1,comments:comments,receive_user_id:receive_user_id,receive_nickname:receive_nickname,comment_id:comment_id},
            success:function(msg){
                console.log(msg);
                com_info+='<li>' +
                    '<span class="icon"><img src="../imgs/basic/meishi/msg_icon.png" alt=""/></span>' +
                    '<span class="com_name">'+nickName+':</span>' +
                    '<span class="com_content">'+comments+'</span>' +
                    '</li>';
                par_ul.append(com_info);
                $(obj).prev().val('');
                $(obj).parent().hide();
            },
            error:function(error){
                if(error.status==404){console.log('页面未找到！')}else if(error.status==500){console.log("提交回复服务器内部错误")}
            }
        })
    }
}




//点赞
function praise(obj){
    var c_id=$(obj).find('.use_id').html();
    console.log(c_id)
    var praise_status=$(obj).find('.praise_status').html();
    var praise_url=webUrl+'nearfood/main/commentpraise';
    var praise_num= $(obj).find('.zan').html();

//    未点赞情况
    if(praise_status==0){
        $.ajax({
            type:"post",
            dataType:"json",
            url:praise_url,
            data:{user_id:userId,comment_id:c_id},
            success:function(msg){
                if(msg.error==0 && msg.data.status==1){
                    showTips(msg.message);
                    autoCloseTips();
                    var a= parseInt(praise_num);
                    var b=1;
                    var c= a+b;
                    $(obj).find('.zan').html(c);
                    $(obj).css({
                        'background-image':'url("../imgs/basic/topic/collect_icon_red.png")'
                    })
                }else if(msg.data.status== -1){
                    var a= parseInt(praise_num);
                    var b=1;
                    var c= a-b;
                    console.log(c)
                    $(obj).find('.zan').html(c);
                    $(obj).css({
                        'background-image':'url("../imgs/basic/topic/collect_icon.png")'
                    });
                    showTips(msg.message);
                    autoCloseTips();
                }
            },
            error:function(error){
                if(error.ststus==500){
                    console.log('praise interal server error!')
                }
            }

        })
    }

//    已点赞情况
    else if(praise_status==1){
        $.ajax({
            type:"post",
            dataType:"json",
            url:praise_url,
            data:{user_id:userId,comment_id:c_id},
            success:function(msg){
                console.log(msg);
                if(msg.error==0 && msg.data.status==-1){
                    showTips(msg.message);
                    autoCloseTips();
                    var a= parseInt(praise_num);
                    var b=1;
                    var c= a-b;
                    console.log(c)
                    $(obj).find('.zan').html(c);
                    $(obj).css({
                        'background-image':'url("../imgs/basic/topic/collect_icon.png")'
                    })
                }else if(msg.data.status== -1){
                    showTips(msg.message);
                    autoCloseTips();
                }

            },
            error:function(error){
                if(error.ststus==500){
                    console.log('praise interal server error!')
                }
            }

        })
    }

}