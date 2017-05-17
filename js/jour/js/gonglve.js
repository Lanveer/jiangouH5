/**
 * Created by lanveer on 2016/12/6.
 */


//页面加载完成之后执行ajax请求

//此时的id即为主页传递过来的id   stringId
window.onload= function(){
    var stragedy_url=webUrl+'travel/main/guidesiterm';
    var time= new Date();
    var year= time.getFullYear(),
        month= time.getMonth()+ 1,
        day=time.getDate(),
        hour=time.getHours(),
        min=time.getMinutes(),
        sec=time.getSeconds();
    var current_time= year+'-'+month+'-'+day+ '  ' +hour +':'+min+':'+sec+'';
    $.ajax({
        type:'post',
        dataType:'json',
        url:stragedy_url,
      data:{id:stringId},
//        data:{id:3},
        success:function(msg){
            var gl_data=msg.data;
            var li_info='';
            $.each(gl_data,function(a,item){
                console.log(item);

                li_info+='<li onclick="transform(this)">' +'<span style="display: none" class="transform-id">'+item.id+'</span>'+
                    '<div class="gl-left am-fl"><img src='+item.image+' alt=""/></div>' +
                    ' <div class="gl-right am-fl"><h1>'+item.title+'</h1>' +
                    ' <ul>' +
                    '<li><img src="../imgs/basic/jour/time.png" alt=""/> <span class="gl-time">'+time+'</span></li>' +
                    '<li><img src="../imgs/basic/jour/restore.png" alt=""/> <span class="gl-restore">'+item.times+'</span></li>' +
                    '<li><img src="../imgs/basic/jour/share.png" alt=""/> <span class="gl-share">'+item.share+'</span></li>' +
                    '</ul>' +
                    '</div>'+
                    '</li>';
            });
            var ul_info= $(".gl-ul");
            ul_info.append(li_info);
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


//攻略跳转详情
function transform(obj){
    var id= $(obj).find('.transform-id').html();
    window.location.href = "gonglve_detail.html?id="+id;
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
