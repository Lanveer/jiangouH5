/**
 * Created by Administrator on 2016/12/5 0005.
 */



window.onload= function(){
    var local_url=webUrl+'localservice/main/servicedetails';
    $.ajax({
        type:'post',
        dataType:'json',
        url:local_url,
        data:{id:stringId,user_id:userId},
        success:function(msg){
         address=msg.data.data.address,
         browse=msg.data.data.browse,
         category_id =msg.data.data.category_id,
         category_tile =msg.data.data.category_tile,
         company=msg.data.data.company,
         contacts=msg.data.data.contacts,
         currency_sign=msg.data.data.currency_sign,
         id =msg.data.data.id,
         im_user_id=msg.data.data.im_user_id,
         introduce =msg.data.data.introduce,
         is_collect=msg.data.data.is_collect,
         is_hide=msg.data.data.is_hide,
         is_show=msg.data.data.is_show,
         is_write=msg.data.data.is_write,
         parent_category_id =msg.data.data.parent_category_id,
         parent_category_title=msg.data.data.parent_category_title,
         price=msg.data.data.price,
         release_count=msg.data.data.release_count,
         tel=msg.data.data.tel,
         title =msg.data.data.title,
         type =msg.data.data.type,
         date =msg.data.data.date,
         release_count =msg.data.data.release_count,
         money =msg.data.data.currency_sign,

         user_id =msg.data.data.user_id;
      $(".user_times").html('他在本地服务类别发布了'+release_count+'条信息');



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

            $('.release_time').html(date);
//            $('.user_message').html(release_count)

     $(".top-title,.section_title,.Mask_title").html(title);
            $(".browse").html(browse);
            $(".first_rank").html(parent_category_title);
            $(".second_rank").html(category_tile);
            $(".local_company").html(company);
            $(".address").html(address);
            $('.section_description').html(introduce);
            $(".footer-left-user").html(contacts);
            $(".user_message").html(release_count);

            //  经纬度的获取
            $('.lat').html(msg.data.data.lat);
            $('.lon').html(msg.data.data.lng);

            //是否显示价格
            if(is_write==0){
                $(".section_price").html('面议')
            }else if(is_write==1){
                $(".section_price").html(money+price)
            }

            // 个人商家判断
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

            //  图片的轮播

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
            collect(userId,title,url,5,stringId,is_collect);



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
            $(".claim").click(function(){

                if(user_id<0 || user_id==0){
                    alert('请先登录后在执行下面操作')
                }else {
                }
//                处于有userId的状态下
                var ua= navigator.userAgent.toLowerCase();
                if(/iphone|ipad|ipod/.test(ua)){
                    if($(".user_info_box").css('display')=='block'){
                        window.location.href='memberInfo://'  + user_id  +'/'+type +'/'+contacts+ '/'+5;
                    }else if($(".user_info_box").css('display')=='none'){
                        window.location.href='reclaim://'+5 +"/" + user_id + "/"+ stringId;
                    }
                }
                else if(/android/.test(ua)){
                    if($('.user_info_box').css('display')=='block'){
                        javascript:android.memberInfo(user_id,type,contacts,5)
                    }else if($(".user_info_box").css('display')=='none'){
                        javascript:android.reclaim(5,user_id,stringId)
                    }
                }
            });



        },
        error:function(error){
            if(error.status==404){console.log("页面未找到！")}
            else if(error.status==500){
                console.log("服务器错误！")
            }
        }
    })


    //浏览增加

    add(webUrl+'localservice/main/addbrowse',stringId);
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
    if(im_user_id==null){
        showTips('不能和自己聊天');
        autoCloseTips();
    }else if(im_user_id!=null){
        if(url.indexOf('android')!=-1){
            javascript:android.openChattingList(im_user_id,first_img,title)
        }else if(url.indexOf('ios')!=-1){
            window.location.href='openChattingList://'+im_user_id +'$'+title +'$'+first_img;
        }
    }
}

//聊天
function openChattingList(){
    var chat=encodeURI(title);
    if(url.indexOf('android')!=-1){
        javascript:android.openChattingList(im_user_id,first_img,title)
    }else if(url.indexOf('ios')!=-1){
        alert()
        window.location.href = "liaotian://" + chat +"&"+first_img + "&"+im_user_id + "";
    }

}
