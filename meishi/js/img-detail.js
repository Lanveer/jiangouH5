/**
 * Created by Administrator on 2017/2/21.
 */


window.onload=function(){

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
    var img_detail=webUrl+'nearfood/main/commentdetails';
    $.ajax({
        type:'post',
        dataType:'json',
        data:{id:stringId},
        url:img_detail,
        success:function(msg){
            console.log(msg)
            var coms=msg.data;
            var com_str='';
            var com_img='';
            var com_play='';
            var ans_str='';
//            处理图片
            var imgs= coms.comments_img;
            $.each(imgs,function(a,b){
                com_img+='<li><img  onclick="showBigImg1()" src='+ b.img+smallImg+' alt=""/></li>';
                com_play += "<div class='swiper-slide'><img onclick='closeImg()' src='"+ b.img +largeImg+ "' alt=''/></div>";
            });
            $("#com_play").append(com_play);


//            处理回复列表
            var com_ans= coms.answer;
            $.each(com_ans,function(r,t){
                ans_str+='<li>' +
                    '<span class="icon"><img src="../imgs/basic/meishi/msg_icon.png" alt=""/></span>' +
                    '<span class="com_name">'+ t.sent_nickname+':</span>' +
                    '<span class="com_content">'+ t.comments+'</span>' +
                    '</li>'
            });


//            列表详情显示
            com_str+='<li>' +
                '<div class="com_header">' +
                '<div class="icon_div"><img class="am-circle" src='+coms.comments.header_img+' alt=""/></div>' +
                '<div class="user_info">' +
                '<span class="users">'+coms.comments.nickname+'</span>' +
                ' <div class="score"><span style="color: #282828">发布了图片</span></div>' +
                '</div>' +
                '<div class="coms"></div>' +
                '</div>' +
                '<div class="com_body">' +
                '<div class="show_imgs"><ul>'+com_img+'</ul></div>' +
                '<div class="com_body_info">' +
                '<ul>' +
                '<li class="browse_li">浏览<span class="browse">'+coms.comments.browse+'</span></li>' +
                '<li class="comments_li">评论<span class="comments">'+coms.comment_num+'</span></li>' +
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
                '<span class="receive_user_id">'+coms.comments.sent_user_id+'</span>'+
                '<span class="receive_nickname">'+coms.comments.nickname+'</span>'+
                '<span class="comment_id">'+coms.comments.id+'</span>'+
                '<ul class="com_footer_ul">'+ans_str+
                '</ul>'
                '</div>' +
                '</li>';
            $("#pinglun").append(com_str);
        },
        error:function(error){
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
        alert("请先输入评论后再提交！");
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





























