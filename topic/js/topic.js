/**
 * Created by lanveer on 2016/12/15.
 */


//储存用户的信息

$('.talk_input').focus(function(){
    var userInfo_url=webUrl+'user/tourist/getbirthandsex';
    $.ajax({
        type:'post',
        dataType:'json',
        data:{user_id:userId},
//        data:{user_id:128},
        url:userInfo_url,
        success:function(msg){
            console.log(msg);
            $('.header_img').html(msg.data.header_img);
            $('.nickname').html(msg.data.nickname);
        },
        error:function(error){
            if(error.status==500){
                console.log('server internal error')
            }
        }
    });

});

function checkIsSelf(obj){
     var receiveId= $('.receive_id').html();
    if(userId == receiveId){
        showTips('自己不能给自己评论！');
        autoCloseTips();
        return;
    }
}



function all_praise(){
  window.location.href='all_prise.html?id='+id;
}

//页面加载完成之后执行ajax请求


window.onload= function(){
    var topic_url=webUrl+'message/main/topicdetails';
    $.ajax({
        type:'post',
        dataType:'json',
      data:{id:stringId, user_id:userId},
//        data:{id:81},
        url:topic_url,
        success:function(msg){
            console.log(msg)
                age=msg.data.topic.age,
                comment_num=msg.data.topic.comment_num,
                content=msg.data.topic.content,
                create_time=msg.data.topic.create_time,
                header_img=msg.data.topic.header_img,
                id=msg.data.topic.id,
                image=msg.data.topic.image,
                nickname=msg.data.topic.nickname,
                praise=msg.data.topic.praise,
                share=msg.data.topic.share,
                title=msg.data.topic.title,
                sex=msg.data.topic.sex;
                receive_id= msg.data.topic.user_id;
            var showAge= age.substring(0,2);

            var type= msg.data.topic.type;
            if(type==0){
                shareImg= image+largeImg;
                $('.banner>img').attr('src',image+largeImg);
            }else if(type==-1){
                $('.banner').hide();
            }


//            提交评论时的楼层数
            var last_floor= msg.data.comment.length;
            $('.last_floor').html(last_floor);
        //数据填充
            $(".topic_icon").attr('src',header_img);
            $(".topic_name").html(nickname);
            $(".topic_age").html(showAge);
            if(title='null'){
                $(".topics>h1").hide()
            }else{
                $(".topics>h1").html('#'+title+'#');
            }

            $(".topics>h3").html(content);
            $(".topics_detail_date").html(create_time);
            $(".topics_detail_share").html(share);
            $(".topics_detail_reading").html(comment_num);
            $(".topics_detail_collect").html(praise);
            $('.receive_id').html(receive_id);
            $(".dianzan_id").html(msg.data.topic.user_id);

//点赞
            var praise=msg.data.topic.praise_status;
            console.log(praise);
            if(praise==1){
                $(".topics_detail_collect").css({
                    'background-image':'url("../imgs/basic/topic/collect_icon_red.png")'
                });

            }else if(praise==0){
                $(".topics_detail_collect").css({
                    'background-image':'url("../imgs/basic/topic/collect_icon.png")'
                })
            }
            $(".topics_detail_collect").click(function(){
                var receive_id= $(".receive_id").html();
                if(praise==0){
                    $.ajax({
                        type:'post',
                        dataType:'json',
                        data:{user_id:userId,mid:stringId,receive_user_id:receive_id},
//                     data:{user_id:2,mid:76},
                        url:webUrl+'message/main/praise',
                        success:function(msg){
                            console.log(msg);
                            $(".topics_detail_collect").css({
                                'background-image':'url("../imgs/basic/topic/collect_icon_red.png")'
                            });
                            var praise_num= $('.topics_detail_collect').html();
                            $('.topics_detail_collect').html(parseInt(praise_num)+1);
                            showTips('点赞+1');
                            autoCloseTips();


                        },error:function(error){
                            if(error.status==500){console.log('点赞请求出错')}
                        }
                    });
                    praise=1;
                }
                else if(praise==1) {
                    $.ajax({
                        type:'post',
                        dataType:'json',
                        data:{user_id:userId,mid:stringId},
//                     data:{user_id:2,mid:76},
                        url:webUrl+'message/main/cancelpraise',
                        success:function(msg){
                            console.log(msg);
                            $(".topics_detail_collect").css({
                                'background-image':'url("../imgs/basic/topic/collect_icon.png")'
                            })
                            var praise_num= $('.topics_detail_collect').html();
                            $('.topics_detail_collect').html(parseInt(praise_num)-1);
                            showTips('取消赞');
                            autoCloseTips();


                        },error:function(error){
                            if(error.status==500){console.log("取消点赞请求错误")}
                        }
                    });
                    praise = 0;
                }
            });


            //性别变化

            var sex= msg.data.topic.sex;
            if(sex=='1'){
                $(".topic_age").css({
                    border:'1px solid #71c4fb',
                    color:'#71c4fb',
                    'background-image':'url("../imgs/basic/topic/boy.png")'
                })
            }
            else if(sex==0){
                $(".topic_age").css({
                    border:'1px solid #fe74a5',
                    color:'#fe74a5',
                    'background-image':'url("../imgs/basic/topic/girl.png")'
                })
            }

//赞过

            var prise= msg.data.praise;
            var prise_str='';
            $.each(prise,function(i,item){
                prise_str+='<li><img onclick="viewOtherInfo(this)" class="am-circle" src='+item.header_img+' alt=""/><span style="display: none;">'+item.user_id+'</span></li>'
            });

            $(".prise_icons").append(prise_str);


//评论
            var coms= msg.data.comment;
            var coms_str='';
            $.each(coms,function(a,b){
                var floor=a+1;
                louceng=floor+1;
                coms_str+='<li>' +
                    '<div class="list_icon"><img onclick="viewOtherInfo(this)" class="am-circle" src='+b.header_img+' alt=""/><span class="user_id" style="display: none">'+ b.user_id+'</span></div>' +
                    '<div class="list_info">' +
                    '<h1>'+b.nickname+'</h1>' +
                    '<p>'+ b.create_time+'</p>' +
                    '<h2>'+ b.comments+'</h2>' +
                    '</div>' +
                    '<div class="list_index"><span class="lo">'+floor+'</span>楼</div>' +
                    '</li>'
            });
            $(".list").append(coms_str);
        },
        error:function(error){
            if(error.status==404){console.log("页面为找到")}else if(error.status==500){console.log('服务器内部错误！')}
        }
    })
};



function send_talk(obj){
    var receive_id=$('.receive_id').html();
 var floor= $(obj).prev().html();
// var floor=parseInt(loceng)+1;
 var text= $(obj).prev().prev().val();
 var list= $(obj).parent().prev().find('.list');



    if($.trim(text)==""){
        showTips("请输入评论再提交哦！");
        autoCloseTips();
        return false;
    }else{
        var sub_url=webUrl+'message/main/sendcomment';
        var sent_header_img=$('.header_img').html();
        var sent_nickname=$('.nickname').html();
        $.ajax({
            type:'post',
            dataType:'json',
            url:sub_url,
          data:{mid:stringId,user_id:userId,comments:text,receive_user_id:receive_id},
            success:function(msg){
                if(msg.error==0){
                    var com_list='';
                    com_list+='<li>' +
                        '<div class="list_icon"><img class="am-circle" src='+sent_header_img+' alt=""/></div>' +
                        '<div class="list_info">' +
                        '<h1>'+sent_nickname+'</h1>' +
                        '<p>'+ create_time+'</p>' +
                        '<h2>'+text+'</h2>' +
                        '</div>' +
                        '<div class="list_index"><span>'+floor+'</span>楼</div>' +
                        '</li>';
                    $(".list").append(com_list);
                    $(obj).prev().val('');
                    showTips('评论成功');
                    autoCloseTips();
                    $(obj).prev().prev().val('');
                }else{
                    showTips(msg.message);
                    autoCloseTips();
                }
            },
            error:function(error){
                showTips('评论失败');
                autoCloseTips();
                if(error.status==404){console.log("页面为找到")}else if(error.status==500){console.log('服务器内部错误！')}
            }
        })
    }

}

$(".talk_input").focus(function(){
    $('.send_talk').css({
        color:'#333'
    })
}).blur(function(){
    $('.send_talk').css({
        color:'#999'
    })
});




//点击返回按钮
function goBack(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='back://';
    } else if (/android/.test(ua)) {
        javascript:android.goBack()
    }
}

//分享
var shareUrl='https://www.jglist.com:9583/topic/index.html?&id='+stringId+'';


function fenxiang(){
    console.log(shareImg.length);

    if(url.indexOf('android')!=-1){
        javascript:android.share(shareUrl,title,content,shareImg.length>0 ? shareImg :'');
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "fenxiang://" +url;
    }
}


//点击头像传递id
function viewOtherInfo(obj){
    var  user_id= $(obj).next().html();
    if(url.indexOf('android')!=-1){
        javascript:android.viewOtherInfo(user_id);
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "viewOtherInfo://" +user_id;
    }
}
