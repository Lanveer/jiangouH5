/**
 * Created by lanveer on 2016/12/6.
 */

//?id=157&platform=ios&userId=188&lat_lng=30.546537,104.064182


try{
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    lat_lng = GetQueryString('lat_lng');

    x_lat_lng = lat_lng.split(',');

    var lat = '';
    var lng = '';
}catch(e){
    console.log(e.message)
}

window.onload= function(){

    var meishi_url=webUrl+'nearfood/main/catedetails';
    $.ajax({
        type:'post',
        dataType:'json',
        url:meishi_url,
      data:{id:stringId,user_id:userId,lat:x_lat_lng[0],lng:x_lat_lng[1],city_id:cityId},
//        data:{id:63,user_i d:98,lat:30.546537,lng:104.064182,city_id:7},
        success:function(msg){
            console.log(msg);
                address=msg.data.data.address,
                category_id=msg.data.data.category_id,
                distance=msg.data.data.distance,
                id=msg.data.data.id,
                image=msg.data.data.image,
                introduce=msg.data.data.introduce,
                lat=msg.data.data.lat,
                lng=msg.data.data.lng,
                operate_time=msg.data.data.operate_time,
                operate_week=msg.data.data.operate_week,
                price=msg.data.data.price,
                star=msg.data.data.star,
                tel=msg.data.data.tel,
                title=msg.data.data.title,
                come_count=msg.data.come_count,
                commend_count=msg.data.commend_count,
                money=msg.data.data.currency_sign,
                is_collect=msg.data.data.is_collect;


            $('.nickName').html(msg.data.data.nickname);
//            $('.food-bg').css({
//               'background-image':"url("+image+ largeImg+")"
//            });
            $(".header-left>img").attr('src',image+largeImg);
            $(".header-right>h1,.top-title").html(title);
            $(".price").html(money+price);
            $(".glocation").html(distance);
            $(".intro-detail").html(introduce);
            $(".open-time").html(operate_time);
            $(".operate_week").html(operate_week);
            $(".open-add").html(address);
            $(".open-tel").html(tel);
            $(".comments-number").html(commend_count);
            $('.visit-number').html(come_count);

            $('.comm-num').html(msg.data.commend_count);
            $('.com-num').html(msg.data.come_count);
            if(commend_count==0){
                $('.section>h1').css({
                    borderBottom:'none'
                })
            }

            //处理点赞的状态




            //header部分的星星数量
            var star=msg.data.data.star;
            var star_ul=$(".eval>ul");
            var str='';
            for(var i=0;i<5;i++){
                if(i<star){
                    str+='<li><img src="../imgs/basic/star-on-big.png" alt=""/></li>';
                }else{
                    str+='<li><img src="../imgs/basic/star-off-big.png" alt=""/></li>';
                }
            }
            star_ul.append(str);

//            循环更多图片
            var more_pic= msg.data.img;
            var pic_list='';
            var more_list = $('.more-list');
            $.each(more_pic,function(a,b){
                pic_list+='<li><img src="'+ b.image+ smallImg + ' " alt=""/></li>'
            });
            more_list.append(pic_list);


            // 推荐循环开始
            var recommend= msg.data.recommend;
            var re_list='';
            var re_ul=$(".recommend_detail");
            $.each(recommend,function(c,d){
                var str='';
                var stars= d.star;
                for(var i=0;i<5;i++){
                    if(i<stars){
                        str+='<li><img src="../imgs/basic/star-on-big.png" alt=""/></li>';
                    }else{
                        str+='<li><img src="../imgs/basic/star-off-big.png" alt=""/></li>';
                    }
                }
                re_list+='<li>' +
                    '<div class="recommend_detail_left"><img src="'+ d.image+smallImg+'" alt=""/></div>' +
                    '<div class="recommend_detail_right">' +
                    '<div class="re_left"><h1>'+ d.title+'</h1>' +
                    ' <div class="re_eval">' +
                    '<ul>'+str+'<span>'+ d.price+' &yen;人</span></ul>' +
                    '</div> ' +
                    '<span class="am-fl re_tag">自助餐</span>' +
                    '<span class="am-fr re_miles">'+ d.distance+' 米</span>' +
                    '</div>' +
                    '<div class="re_right"><img class="re_right_img" onclick="re_call(this)" src="../imgs/basic/tel.png" alt=""/><span style="display: none;" class="re_tel">'+ d.tel+'</span></div>' +
                    '</div>' +
                    '</li>';
            });
            re_ul.append(re_list);

            //  判断收藏情况
            if(is_collect==0){
                $(".collect").css({
                    'background-image':'url("../imgs/basic/collect.png")'
                })
            }else if(is_collect==1){
                $(".collect").css({
                    'background-image':'url("../imgs/basic/collected.png")'
                })
            }

            $(".collect").click(function(){
                if(is_collect==0){
                    $(".collect").css({
                        'background-image':'url("../imgs/basic/collected.png")'
                    });
                    var add_collect_url=webUrl+'personal/main/addcollect';
                    $.ajax({
                        url:add_collect_url,
                        type:'post',
                        dataType:'json',
                        data:{user_id:userId,title:title,url:url,type:6,id:stringId},
//                          data:{user_id:1,title:title,url:url,type:6,id:2},
                        success:function(d){
                            console.log(d);
                            if(d.error==418){
                                $(".collected").hide();$(".collect1").show();
                                alert('收藏失败！')
                            }else if(d.error==0){
                                $(".collected").show();$(".collect1").hide();
                                alert('收藏成功！');
                            }
                        },error:function(e){
                            if(e.status==404){'未找到页面'}else if(e.status==500){console.log('添加收藏服务器失败')}
                        }
                    });
                    is_collect=1;
                }else if(is_collect==1){
                    $(".collect").css({
                        'background-image':'url("../imgs/basic/collect.png")'
                    });
                    var delete_collect_url=webUrl+'personal/main/cancelcollect';
                    $.ajax({
                        url:delete_collect_url,
                        type:'post',
                        dataType:'json',
                        data:{user_id:userId,id:id},
//                    data:{user_id:1,id:2},
                        success:function(del){
                            console.log(del);
                            if(del.error>0){
                                $(".collected").show();$(".collect1").hide();
                                alert('删除失败');
                            }else if(del.error==0){
                                $(".collected").hide();$(".collect1").show();
                                alert('删除成功');
                            }
                        },error:function(err){
                            if(err.status==404){console.log("未找到")}
                            else if(err.status==500){
                                console.log("删除收藏服务器错误！")
                            }
                        }
                    });
                    is_collect=0
                }
            });



            var com_str='';
            var com_list='';
            var com_play='';

            var coms= msg.data.commend;
//            index评论得星星数量


            $.each(coms,function(x,y){
                var s= y.comments;
            });

//            index评论图片
            $.each(coms,function(k,j){
                var k= j.comments_img;

              $.each(k,function(r,s){
                  com_play += "<div class='swiper-slide'><img onclick='closeImg()' src='"+ s.img +largeImg+ "' alt=''/></div>";              })
            });

            $("#com_play").append(com_play);
            $.each(coms,function(r,p){
                var coms_imgs= p.comments_img;
                var com_str='';
                $.each(coms_imgs,function(m,n){
                com_str+='<li><img onclick="showBigImg1()"  src="'+ n.img+smallImg +'" alt=""/></li>';
                });
                var star_str='';
                for(var i=0;i<5;i++){
                    if(i< p.comments.score){
                        star_str+='<li><img src="../imgs/basic/star-on-big.png" alt=""/></li>';
                    }else{
                        star_str+='<li><img src="../imgs/basic/star-off-big.png" alt=""/></li>';
                    }
                }
                com_list+='<li>'+
                    '<div class="com_header" onclick="transfer(this)">' +'<span style="display: none" class="use_id">'+ p.comments.id+'</span>'+
                    '<div class="icon_div"><img class="am-circle" src='+ p.comments.header_img+' alt=""/></div>' +
                    '<div class="user_info">' +
                    '<span class="users">'+ p.comments.nickname+'</span>' +
                    ' <div class="score"><span>打分:</span> <ul>'+star_str+'</ul></div>' +
                    '</div>' +
                    '<div class="coms"><p>'+ p.comments.comments+'</p></div>' +
                    '</div>' +
                    '<div class="com_body">' +
                    '<div class="show_imgs"><ul>'+com_str+'</ul></div>' +
                    '<div class="com_body_info">' +
                    '<ul>';
                    if(p.comments.parise_status==0){
                        com_list+='<li class="browse_li praise" onclick="praise(this)"><span class="browse zan">'+ p.comments.parise+'</span> <span  style="display: none" class="use_id">'+ p.comments.id+'</span> <span class="praise_status" style="display: none">'+ p.comments.parise_status+'</span></li>'
                    }else if(p.comments.parise_status==1){
                        com_list+= '<li class="browse_li praise2" onclick="praise(this)"><span class="browse zan">'+ p.comments.parise+'</span> <span  style="display: none" class="use_id">'+ p.comments.id+'</span> <span class="praise_status" style="display: none">'+ p.comments.parise_status+'</span></li>'
                    }
                    com_list+='<li class="comments_li">评论<span class="comments">'+ p.comment_num+'</span></li>' +
                    '<li class="rep" onclick="do_com(this)"><img src="../imgs/basic/meishi/rep.png" alt=""/>回复</li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="input_area"> ' +
                    '<textarea name="" class="input"></textarea>' +
                    '<button class="reply" onclick="reply(this)">回复</button>'+
                    '</div>' +
                    '</div>' +
                    '<div class="com_footer">' +
                    '<span class="receive_user_id">'+ p.comments.sent_user_id+'</span>'+
                    '<span class="receive_nickname">'+ p.comments.nickname+'</span>'+
                    '<span class="comment_id">'+ p.comments.id+'</span>'+
                    '<span class="comsNum" style="display: none">'+ p.comment_num+'</span>'+
                    '<ul class="com_footer_ul">'+
                    '</ul>' +
                    '</div>' +
                    '</li>';
            });

            $("#pinglun").append(com_list);


            //详情页面的评论列表
//            var coms= msg.data.commend.comments;
//            var coms_img=msg.data.commend.comments_img;

             // 处理评论的回复列表
//            var com_ans=msg.data.commend.answer;
//            var ans_str='';
//            $.each(com_ans,function(r,t){
//                ans_str+='<li>' +
//                    '<span class="icon"><img src="../imgs/basic/meishi/msg_icon.png" alt=""/></span>' +
//                    '<span class="com_name">'+ t.sent_nickname+':</span>' +
//                    '<span class="com_content">'+ t.comments+'</span>' +
//                    '</li>'
//            });

//        var flag=coms_img.length;
//        if(flag==0){}else if(flag!=0){ $('.show_imgs').show();}
//            var com_str='';
//            var com_play='';
//            var com_list='';
//            $.each(coms_img,function(a,m){
//                com_str+='<li onclick=""><img onclick="showBigImg1()"  src="'+ m.img+smallImg +'" alt=""/></li>';
//                com_play += "<div class='swiper-slide'><img src='"+ m.img +largeImg+ "' alt=''/></div>";
//            });
//            $("#com_play").append(com_play);

//            var browse_li=coms.browse;
//            var comments_li=msg.data.commend.comment_num;
//





        },
        error:function(error){
            if(error.status==404){console.log('页面未找到')}else if(error.status==500){console.log('服务器错误！')}
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
    var comsNum =$(obj).parent().parent().next().find('.comsNum').html();
    var com_info='';
//    console.log(comsNum);
    console.log(receive_user_id);
//    console.log(receive_nickname);
//    console.log(comment_id);
//    console.log(stringId);
    console.log(user_id);
//    console.log(comments);



    if($.trim(comments)==''){
        showTips('请填写内容后再提交！');
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
                if(msg.error==0){
                    showTips('回复成功！');
                    comsNum+=1;
//                    window.location.reload();

                }else{
                    showTips('回复失败！')
                }
                autoCloseTips();

                com_info+='<li>' +
                    '<span class="icon"><img src="../imgs/basic/meishi/msg_icon.png" alt=""/></span>' +
                    '<span class="com_name">'+nickName+':</span>' +
                    '<span class="com_content">'+comments+'</span>' +
                    '</li>';
//                不用将评论详情加到列表后面。
//                par_ul.append(com_info);
                $(obj).prev().val('');
                $(obj).parent().hide();
            },
            error:function(error){
                if(error.status==404){console.log('页面未找到！')}else if(error.status==500){console.log("提交回复服务器内部错误")}
            }
        })
    }
}

//点击地图
function launchGoogleMap(obj){
    var address=encodeURI(address);
    //var lat= $('.lat').html();
    //var lon= $('.lon').html();
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='launchGoogleMap://' +lat +'&'+ lng +'&'+ address;
    } else if (/android/.test(ua)) {
        javascript:android.launchGoogleMap(lat+','+lng)
    }
}


//拨打电话
function call(){
    if(url.indexOf('android')!=-1){
        javascript:android.tel(tel,false);

    }else if(url.indexOf('ios')!=-1){
        window.location.href="call://"+tel;
    }

}


//推荐列表打电话
function re_call(obj){
    var recoment_tel= $(obj).next().html();
    console.log(recoment_tel);

    if(url.indexOf('android')!=-1){
        javascript:android.tel(recoment_tel,false);

    }else if(url.indexOf('ios')!=-1){
        window.location.href="call://"+recoment_tel;
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

//点击返回按钮
function goBack(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='back://';
    } else if (/android/.test(ua)) {
        javascript:android.goBack()
    }
}




//签到跳转
function sign_up(){
    $.ajax({
        type:'post',
        dataType:'json',
        url:webUrl+'nearfood/main/catesignin',
        data:{cid:stringId,user_id:userId},
        success:function(msg){
            console.log(msg);
            if(msg.error==0){
                showTips('签到成功！');
                autoCloseTips();
//                window.location.href='qiandao.html?id='+id+'&userId='+userId+'&status=' +1;
            }else{
                var tip= msg.message;
                showTips(tip);
//                window.location.href='qiandao.html?id='+id+'&userId='+userId;
                autoCloseTips();
            }

        },error:function(error){
            if(error.status==500){
                console.log('signup  interface error!')
            }
        }
    });


}

//来过跳转

function visit(obj){
    var come_count=$(obj).find('.com-num').html();
    if(come_count==0){
        showTips('暂时没有评论，马上去点评');
        autoCloseTips();
    }else if(come_count>0){
        window.location.href='laiguo.html?id='+id +'&userId='+userId;
    }
}

//点击评论跳转

function com_transform(obj){
    var comNum=$(obj).find('.comm-num').html();
    if(comNum==0){
       showTips('暂时没有来过，马上去点评');
       autoCloseTips();
    }else if(comNum>0){
        window.location.href='dianping.html?id='+id+'&userId='+userId;

    }
}

//更多图片跳转

function moreImg(){
    window.location.href='more_imgs.html?id='+id
}

//商务合作

function cooperate(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='cooperation://';
    } else if (/android/.test(ua)) {
        javascript:android.cooperation()
    }
}


//传图片

function upload_img(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='upload:// + '+stringId+'';
    } else if (/android/.test(ua)) {
        javascript:android.uploadImg(stringId)
    }
}


//写评论
function comments(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='comment://+ '+stringId+'';
    } else if (/android/.test(ua)) {
        javascript:android.comment(stringId,title)
    }
}


//举报
function report(){
    var isReport=false;
    if(url.indexOf('android')!=-1){
        javascript:android.report(5,stringId,userId, isReport)
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "report://" + 5 +"/"+stringId + "/"+userId + "/"+ isReport;
    }
}

//点击评论列表跳转
function transfer(obj){
    var u_id= $(obj).find('.use_id').html();
    console.log(u_id);
        window.location.href='dianping_detail.html?id='+u_id+'&userId='+userId;

}


//点赞
function praise(obj){
    var c_id=$(obj).find('.use_id').html();
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
