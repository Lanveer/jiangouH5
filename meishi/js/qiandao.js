/**
 * Created by lanveer on 2016/12/6.
 */

/**
 * Created by lanveer on 2016/12/6.
 */

/**
 * Created by lanveer on 2016/12/6.
 */

//截取参数标识是否签到成功

var url= location.href;
console.log(url);
if(url.indexOf('status')!=-1){

}else{
//    标识签到失败
//    $('.success-tips>img').attr('src','../imgs/basic/meishi/error.png');
    $('.success-tips>span').html('已签到！');
}






//获取列表

window.onload= function(){
//    var com_list=webUrl+'nearfood/main/commentiterm';
    var com_list=webUrl+'nearfood/main/signuseriterm';
    $.ajax({
        type:'post',
        dataType:'json',
        url:com_list,
         data:{cid:stringId,pages:1},
//        data:{id:2,pages:1},
        success:function(msg){
            console.log(msg);


            var coms=msg.data;
            var visit_list='';
            $.each(coms,function(a,item){
//                console.log(item);
                var status_code=item.status;
                var status=item.status;
                if(status==1){
                    var status='来评论过'
                }else if(status==2){
                    var status='来传过图'
                }
                visit_list+='<li onclick="transfer(this)"><span class="am-fl sign-list-icon"><img class="am-circle" src='+item.header_img+' alt=""/></span>' +
                    '<div class="am-fl sign-list-detail">' +
                    '<span class="sign-list-detail-name">'+item.nickname+'</span>' +
                    '<p style="margin-top: 0"><span class="sign-list-detail-data">'+item.create_time+'</span> <span class="sign-list-detail-status"></span></p>' +
                    '</div>' +
                    '<span class="am-fr arrow arrow1"><img src="../imgs/basic/meishi/more-arows.png" alt=""/></span>' +'</span>' +'<span class="use_id" style="display: none">'+item.id+'</span>'+'<span class="use_status" style="display: none">'+status_code+'</span>'+
                    '</li>'
            });

            $(".sign-list-info").append(visit_list)
        },error:function(error){
            if(error.status==404){
                console.log('页面未找到')
            }else if(error.status==500){
                console.log("服务器内部错误！")
            }
        }
    })

};

function transfer(obj){
    var s_c= $(obj).find('.use_status').html();
    var u_id= $(obj).find('.use_id').html();
    if(s_c==1){
        window.location.href='dianping_detail.html?id='+u_id;
    }else if(s_c==2){
        window.location.href='img-detail.html?id='+u_id;
    }
}



