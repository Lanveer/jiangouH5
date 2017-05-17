/**
 * Created by lanveer on 2016/12/6.
 */

//页面加载完成之后执行ajax请求
window.onload = function(){
    var gl_detailUrl=webUrl+'travel/main/guidesdetails';
    $.ajax({
        type:'post',
        dataType:'json',
        url:gl_detailUrl,
        data:{id:stringId},
//        data:{id:3},
        success:function(msg){
            var gl= msg.data;
            var gl_list='';
            var gl_ul=$(".gl-detail>ul");
            $.each(gl,function(a,item){
                gl_list+='<li>' +
                    '<div class="gl-guide">' +
                    '<span class="gl-rank">'+item.steps+'</span>' +
                    '<h1>'+item.title+'</h1>' +
                    '</div>'+
                    ' <div class="gl_imgs"><img src='+item.image+largeImg +' alt=""/></div> ' +
                    '<p>'+item.content+'</p>' +
                    '</li>';
            });
            gl_ul.append(gl_list);

        },
        error:function(error){
            if(error.status==404){
                console.log("页面未找到")
            }else if(error.status==500){
                console.log("服务器内部错误!")
            }
        }

    })
};

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
        javascript:android.share(url);
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "fenxiang://" +url;
    }
}
