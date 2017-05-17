/**
 * Created by Administrator on 2016/12/5 0005.
 */


//执行ajax请求
 window.onload = function(){

//     var userInfo_url=topic_url+'user/tourist/getbirthandsex';
//     $.ajax({
//         type:'post',
//         dataType:'json',
//         data:{user_id:userId},
////         data:{user_id:135},
//         url:userInfo_url,
//         success:function(msg){
//             console.log(msg);
//             $('.user_name').html(msg.data.nickname);
//             $(".user_icon").attr('src',msg.data.header_img)
//         },
//         error:function(error){
//             if(error.status==500){
//                 console.log('server internal error')
//             }
//         }
//     });

     var house_url=webUrl+'houserental/main/rentaldetails';
     $.ajax({
         type:'post',
         dataType:'json',
         url:house_url,
         data:{id:stringId,user_id:userId},
//         data:{id:36,user_id:98},
         success:function(msg){
             console.log(msg);
             address= msg.data.data.address,
                 area=msg.data.data.area,
                 category_id=msg.data.data.category_id,
                 id=msg.data.data.id,
                 is_show=msg.data.data.is_show,
                 parent_category_id=msg.data.data.parent_category_id,
                 title=msg.data.data.title,
                 price =msg.data.data.price,
                 browse =msg.data.data.browse,
                 floor=msg.data.data.floor,
                 address =msg.data.data.address,
                 contacts=msg.data.data.contacts,
                 tel=msg.data.data.tel,
                 times =msg.data.data.times,
                 introduce=msg.data.data.introduce,
                 is_hide =msg.data.data.is_hide,
                 user_id =msg.data.data.user_id,
                 type =msg.data.data.type,
                 is_collect=msg.data.data.is_collect,
                 im_user_id=msg.data.data.im_user_id,
                 money=msg.data.data.currency_sign,
             release_count= msg.data.data.release_count,

               $(".user_times").html('他在房屋租售类别发布了'+release_count+'条信息');

             date= msg.data.data.date;
             //            发布者的信息
             var name= msg.data.data.nickname;
             if(name.length>3){
                 showName= name.substring(0,5);
                 $('.user_name').html(showName);
             }else{
                 showName=name;
                 $('.user_name').html(showName);
             }
             $(".user_icon").attr('src',msg.data.data.header_img)


             $('.top-title,.Mask_title,.section_title').html(title);
             if(price<0){
                 $(".section_price").html('面议');
             }else{
                 $(".section_price").html(money+price);
             }
             $('.browse').html(browse);
             $('house_floor').html(floor);
             $(".house_square").html(area);
             $('.address').html(address);
             $('.section_description').html(introduce);
             $('.footer-left-user').html(contacts);
//             $(".user_message").html(release_count);
             $('.house_floor').html(floor);
             $('.release_time').html(date)
//  经纬度的获取
             $('.lat').html(msg.data.data.lat);
             $('.lon').html(msg.data.data.lng);




             //            个人商家判断
             if(type==1){
                 $(".tag").html('个人')
             }else if(type==2){
                 $('.tag').html('商家')
             }

//            电话号码是否隐藏
             if(is_hide==1){
                 $('.footer-left-phone').html(tel);
             }else {
                 $('.footer-left-phone').html('********');
             }



             //            图片的轮播
             var pics=msg.data.img;
             if(pics.length==0){$("#play").hide();}
             first_img=pics[0].image+smallImg;
             var lunbo='';
             var big_lunbo='';
             $.each(pics,function(a,b){
                 lunbo += "<div class='swiper-slide'><img onclick='showBigImg()' src='"+ b.image+ largeImg+"' alt=''/></div>";
                 big_lunbo += "<div class='swiper-slide'><img onclick='closeImg()' src='"+ b.image+ largeImg+"' alt=''/></div>";
             });
             $("#small_play").append(lunbo);
             $("#big_play").append(big_lunbo);



             //  判断收藏情况
             is_coll(is_collect);
             collect(userId,title,url,4,stringId,is_collect);


             //是否是认领开始

             if(user_id<0||user_id==0){
                 $(".user_info_box").hide();
                 $(".unrenling").show();
                 $(".footer-left-user").html("未认领");
                 $(".tag").html('未认领');
             }else if(user_id>0){
                 $(".user_info_box").show();
                 $(".unrenling").hide();
             }

             //点击认领之后
             $(".claim").click(function(){
                 if(user_id<0 || user_id==0){
                     alert('请先登录后在执行下面操作')
                 }else {

                 }
//                处于有userId的状态下
                 var ua= navigator.userAgent.toLowerCase();
                 if(/iphone|ipad|ipod/.test(ua)){
                     if($(".user_info_box").css('display')=='block'){
                         window.location.href='memberInfo://'  + user_id  +'/'+type +'/'+contacts+ '/'+4;
                     }else if($(".user_info_box").css('display')=='none'){
                         window.location.href='reclaim://'+4 +"/" + user_id + "/"+ stringId;
                     }
                 }
                 else if(/android/.test(ua)){
                     if($('.user_info_box').css('display')=='block'){
                         javascript:android.memberInfo(user_id,type,contacts,4)
                     }else if($(".user_info_box").css('display')=='none'){
                         javascript:android.reclaim(4,user_id,stringId)
                     }
                 }
             });
         },
         error:function(error){
             if(error.status==404){
                 console.log("页面为找到！")
             }else if(error.status==500){
                 console.log('服务器内部错误！')
             }
         }
     })


     //浏览增加

     add(webUrl+'houserental/main/addbrowse',stringId);

 };


//点击地图
function launchGoogleMap(obj){
    var add= $('.add').html();
    var address=encodeURI(add);
    var lat= $('.lat').html();
    var lon= $('.lon').html();
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='launchGoogleMap://'+lat +'&'+ lon+'&'+ address;
    } else if (/android/.test(ua)) {
        javascript:android.launchGoogleMap(lat+','+lon)
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

//拨打电话
function call(){
    if(url.indexOf('android')!=-1){
        javascript:android.tel(tel,is_hide==0);

    }else if(url.indexOf('ios')!=-1){
        window.location.href="call://"+tel;
    }
}

//发送短信
function sendMsg(){
    if(url.indexOf('android')!=-1){
        javascript:android.sms(tel,is_hide==0)
    }else if(url.indexOf('ios')!=-1){
        window.location.href="sendMsg://"+tel;
    }
}

//举报
function report(){
    var isReport=true;
    if(url.indexOf('android')!=-1){
        javascript:android.report(parent_category_id,stringId,user_id, isReport)
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "report://" + parent_category_id +"/"+stringId + "/"+user_id + "/"+ isReport;
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



//聊天
function openChattingList(){
    var chat=encodeURI(title);
    if(url.indexOf('android')!=-1){
        javascript:android.openChattingList(im_user_id,first_img,title)
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "liaotian://" + chat +"&"+first_img + "&"+im_user_id + "";
    }

}
