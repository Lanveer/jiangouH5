/**
 * Created by lanveer on 2016/12/6.
 */

//页面加载完成之后执行ajax请求

window.onload= function(){
    var benifit_url=webUrl+'preferential/main/prefdetails';
    $.ajax({
        type:'post',
        dataType:'json',
        url:benifit_url,
        data:{id:stringId,user_id:userId},
        success:function(msg){
                address=msg.data.address,
                collect_count=msg.data.collect_count,
                id=msg.data.id,
                introduce=msg.data.introduce,
                is_collect=msg.data.is_collect,
                little_title=msg.data.little_title,
                share =msg.data.share,
                shop_name =msg.data.shop_name,
                tel=msg.data.tel,
                title=msg.data.title,
                money=msg.data.currency_sign,
                shop_url=msg.data.url;
            $(".top-title,.Mask_title,.ben-title0").html(title);
            $(".ben-title1").html(little_title);
            $(".ben-des").html(introduce);
            $(".shop_name").html(shop_name);
            $(".tel-number").html(tel);
            $(".ben_add").html(address);
            $(".shop_url").html(shop_url);
            $(".share_count").html(share);
            $(".collect_count").html(collect_count);



//  经纬度的获取
            $('.lat').html(msg.data.lat);
            $('.lon').html(msg.data.lng);


//   收藏
    is_coll(is_collect);
    collect(userId,title,url,7,stringId,is_collect);


            //图片的轮播
            try{
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
            }catch(e){
                console.log(e.message)
            }
        },
        error:function(error){
            if(error.status==404){
                console.log("页面未找到！")
            }else if(error.status==500){
                console.log('服务器内部错误！')
            }
        }
    })
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


//分享
function fenxiang(){
    if(url.indexOf('android')!=-1){
        javascript:android.share(url,title,first_img);
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "fenxiang://" +url;
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
/**
 * Created by Administrator on 2017/1/20.
 */
