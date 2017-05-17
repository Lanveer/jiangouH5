/**
 * Created by Administrator on 2017/1/12.
 */
window.onload= function(){


    var shake_url= webUrl+"preferential/main/shakedetails";
    $.ajax({
        type:"post",
        dataType:'json',
        url:shake_url,
        data:{id:stringId,user_id:userId},
        success:function(msg){
            address=msg.data.address,
            collect_count=msg.data.collect_count,
            end=msg.data.end,
            id=msg.data.id,
            introduce=msg.data.introduce,
            is_collect=msg.data.is_collect,
            little_title =msg.data.little_title,
            origin_price =msg.data.origin_price,
            price=msg.data.price,
            share =msg.data.share,
            shop_name=msg.data.shop_name,
            tc=msg.data.tc,
            tel=msg.data.tel,
            title =msg.data.title;

            //图片轮播
            var imgs= msg.data.img;
            var str='';
            $.each(imgs,function(i,b){
                str+="<div class='swiper-slide'><img src='"+ b.image+largeImg+"' alt=''/></div>"
            });
            $(".swiper-wrapper").append(str);

            //收藏

            is_coll(is_collect);
            collect(userId,title,url,7,stringId,is_collect);

            $('.play-title>p').html(end);
            $('.header>h1').html(title);
            $('.now-price').html('$'+price+'/现价');
            $('.prev-price').html('$'+origin_price);
            $('.collect-account').html(collect_count);
            $('.intro>p').html(introduce);
            $('.shop-name').html(shop_name);
            $('.shop-tel').html(tel);
            $('.shop-add').html(address);
        },error:function(error){
            if(error.status==500){
                console.log('server internal error')
            }
        }
    })
};