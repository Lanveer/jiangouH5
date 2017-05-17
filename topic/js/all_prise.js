/**
 * Created by lanveer on 2016/12/15.
 */
/**
 * Created by lanveer on 2016/12/15.
 */


//页面加载完成之后执行ajax请求


window.onload= function(){
    var topic_url=webUrl+'message/main/praisepeople';
    $.ajax({
        type:'post',
        dataType:'json',
        data:{id:stringId},
//        data:{id:291},
        url:topic_url,
        success:function(msg){
            console.log(msg);
            var list=msg.data;
            var list_str='';
            $.each(list,function(i,item){
                console.log(item);
                list_str+='<li>' +
                    '<div class="all_prise_icon"><img onclick="viewOtherInfo(this)" class="am-circle" src='+item.header_img+' alt=""/> <span style="display: none" class="user_id">'+item.user_id+'</span></div>' +
                    '<div class="detail-box"><span style="margin-left: 15pt" onclick="viewOtherInfo()">'+item.nickname+'</span> <span class="all_prise_time11">'+item.create_time+'</span></div>'+
                    '</li>'
            });
            $(".all_prise").append(list_str)

        },
        error:function(error){
            if(error.status==404){console.log("页面为找到")}else if(error.status==500){console.log('服务器内部错误！')}
        }
    })

};



//点击头像传递id
function viewOtherInfo(obj){
    var  user_id= $(obj).next().html();
    console.log(user_id);
    if(url.indexOf('android')!=-1){
        javascript:android.viewOtherInfo(''+user_id);
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "viewOtherInfo://" +user_id;
    }
}


function viewOtherInfo(){
    var  user_id= 190;

        window.location.href = "viewOtherInfo://" +user_id;

}
