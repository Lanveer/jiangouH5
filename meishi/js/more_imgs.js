

window.onload= function(){
    var moreImg_url=webUrl+'nearfood/main/moreimg';
//    var moreImg_url=webUrl+'nearfood/main/moreimg';
    $.ajax({
        type:'post',
        dataType:'json',
        url:moreImg_url,
        data:{'id':stringId},
        success:function(msg){
            var imgs=msg.data;
            console.log(msg);
            var str='';
            var str2='';
            $.each(imgs,function(i,b){
//                console.log(b)
//                str+='<li><div class="am-gallery-item"><a href=""><img onclick="closeImg()" src="'+ b.image+largeImg+ ' " alt=""/></a></div></li>'
                str+='<li><img onclick="showBigImg1()" src="'+ b.image+smallImg+ ' " alt=""/></li>'
                str2+="<div class='swiper-slide'><img onclick='closeImg()' src='"+ b.image +largeImg+ "' alt=''/></div>"
            });
            console.log(str);
           $('.more-pic-detail1').append(str);
            $('#com_play').append(str2)

        },
        error: function(error){
            if(error.status==404){
                console.log('页面未找到')
            }else if(error.status==500){
                console.log('服务器内部错误呀！')
            }
        }
    })


};