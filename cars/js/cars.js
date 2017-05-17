/**
 * Created by Administrator on 2016/12/5 0005.
 */


//页面加载完成之后执行ajax请求

window.onload=function(){
    var cars_url=webUrl+'usedcar/car/usedcardetails';
    $.ajax({
        type:'post',
        dataType:'json',
        url:cars_url,
       data:{id:stringId,user_id:userId},
             success:function(msg){
            console.log(msg);
             title =msg.data.usedcardetail.title,
             price =msg.data.usedcardetail.price,
             type =msg.data.usedcardetail.type,
             browse=msg.data.usedcardetail.browse,
             brand_name =msg.data.usedcardetail.brand_name
            degree=msg.data.usedcardetail.degree,
            category=msg.data.usedcardetail.category,
            color=msg.data.usedcardetail.color,
            address=msg.data.usedcardetail.address,
            introduce =msg.data.usedcardetail.introduce,
            contacts =msg.data.usedcardetail.contacts,
            release_count=msg.data.usedcardetail.release_count,
            tel=msg.data.usedcardetail.tel,
            im_user_id=msg.data.usedcardetail.im_user_id,
            user_id=msg.data.usedcardetail.user_id,
            is_collect=msg.data.usedcardetail.is_collect,
            is_hide =msg.data.usedcardetail.is_hide,
            parent_category_id=msg.data.usedcardetail.parent_category_id,
            id=msg.data.usedcardetail.id,
            date=msg.data.usedcardetail.date,
//            money=msg.data.usedcardetail.currency_sign,
           currency_sign=msg.data.usedcardetail.currency_sign,
            times=msg.data.usedcardetail.times;

                //获取发布者的信息
                 var name= msg.data.usedcardetail.nickname;
                 console.log(name)
                 if(name.length>3){
                    var showName= name.substring(0,5);
                     $('.user_name').html(showName);
                 }else{
                     showName=name;
                     $('.user_name').html(showName);
                 }
                 $(".user_icon").attr('src',msg.data.usedcardetail.header_img);

            $(".top-title,.Mask_title,.section_title").html(title);
                 if(price<0){
                     $(".section_price").html('面议');
                 }else{
                     $(".section_price").html(currency_sign+price);
                 }

            $(".browse").html(browse);
            $(".cars_brand").html(brand_name);
            $('.cars_type').html(category);
            $(".cars_color").html(color);
            $(".cars_mile").html(degree);
            $(".address").html(address);
            $(".section_description").html(introduce);
            $(".footer-left-user").html(contacts);
//            $(".user_message").html(release_count);
            $('.release_time').html(date);
      $(".user_times").html('他在新旧车辆类别发布了'+release_count+'条信息');

            //  经纬度的获取
            $('.lat').html(msg.data.usedcardetail.lat);
            $('.lon').html(msg.data.usedcardetail.lng);

            //个人商家判断
            if(type==0){
                $(".tag").html('个人')
            }else if(type==1){
                $('.tag').html('车行')
            }else if(type==2){
                $('.tag').html('经纪人')
            }

            //  电话号码是否隐藏
            if(is_hide==1){
                $('.footer-left-phone').html(tel);
            }else {
                $('.footer-left-phone').html('********');
            }



            //  判断收藏情况
            is_coll(is_collect);
            collect(userId,title,url,2,stringId,is_collect);


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
                    showTips('请先登录后在执行下面操作');
                    autoCloseTips();
                }else {
                }
//                处于有userId的状态下
                var ua= navigator.userAgent.toLowerCase();
                if(/iphone|ipad|ipod/.test(ua)){
                    if($(".user_info_box").css('display')=='block'){
                        window.location.href='memberInfo://'  + user_id  +'/'+type +'/'+contacts+ '/'+parent_category_id;
                    }else if($(".user_info_box").css('display')=='none'){
                        window.location.href='reclaim://'+parent_category_id +"/" + user_id + "/"+ stringId;
                    }
                }
                else if(/android/.test(ua)){
                    if($('.user_info_box').css('display')=='block'){
                        javascript:android.memberInfo(user_id,type,contacts,parent_category_id)
                    }else if($(".user_info_box").css('display')=='none'){
                        javascript:android.reclaim(parent_category_id,user_id,stringId)
                    }
                }
            });

//            图片的轮播
            try{
                var pics=msg.data.img;
                if(pics.length==0){$("#play").hide();}
                first_img =pics[0].image+smallImg;
                var lunbo='';
                var big_lunbo='';
                $.each(pics,function(a,b){
                    lunbo += "<div class='swiper-slide'><img onclick='showBigImg()' src='"+ b.image+ largeImg+"' alt=''/></div>";
                    big_lunbo += "<div class='swiper-slide'><img onclick='closeImg()' src='"+ b.image+ largeImg+"' alt=''/></div>";
                });
                $("#small_play").append(lunbo);
                $("#big_play").append(big_lunbo);

            }catch (e){
                console.log(e.message)
            }


        },
        error:function(error){
            if(error.status==404){
                console.log("页面未找到")
            }else if(error.status==500){
                console.log("服务器内部错误！")
            }
        }
    });

    //浏览增加

add(webUrl+'usedcar/car/addbrowse',stringId);

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
}    }

//分享
function fenxiang(){
    if(url.indexOf('android')!=-1){
        javascript:android.share(url,title);
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


