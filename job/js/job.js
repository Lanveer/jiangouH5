/**
 * Created by Administrator on 2016/12/5 0005.
 */

//执行ajax请求

window.onload= function(){
    var job_url=webUrl+'recruitment/main/recruitdetails';
    $.ajax({
        type:'post',
        dataType:'json',
        url:job_url,
        data:{id:stringId,user_id:userId},
//        data:{id:52,user_id:2},
        success:function(msg){
            address=msg.data.address,
                browse=msg.data.browse,
                company=msg.data.company,
                contacts=msg.data.contacts,
                create_time =msg.data.create_time,
                 currency_sign=msg.data.currency_sign,
                education=msg.data.education_option.title,
                experience=msg.data.experience_option.title,
                id=msg.data.id,
                im_user_id=msg.data.im_user_id,
                introduce=msg.data.introduce,
                is_collect =msg.data.is_collect,
                is_hide =msg.data.is_hide,
                recruit=msg.data.recruit,
                salary=msg.data.salary_option.title,
                tel =msg.data.tel,
                times=msg.data.times,
                title =msg.data.title,
                release_count=msg.data.release_count,
                date=msg.data.date,
                user_id =msg.data.user_id;
            $(".user_times").html('他在工作招聘类别发布了'+release_count+'条信息');


            //            发布者的信息
            var name= msg.data.nickname;
            if(name.length>3){
                showName= name.substring(0,5);
                $('.user_name').html(showName);
            }else{
                showName=name;
                $('.user_name').html(showName);
            }
            $(".user_icon").attr('src',msg.data.header_img);

            $(".top-title,.Mask_title,.job_title").html(title);
            $(".job_browse").html(browse);
            $('.job_salary').html(salary);
            $(".job_persons").html(recruit);
            $(".job_education").html(education);
            $(".job_experience").html(experience);
            $(".job_company").html(company);
            $(".job_location").html(address);
            $(".section_description").html(introduce);
            $('.footer-left-user').html(contacts);

            $('.job_releaseTime').html(date);
//            $('.user_message').html(release_count);

//            电话号码是否隐藏
            if(is_hide==1){
                $('.footer-left-phone').html(tel);
            }else {
                $('.footer-left-phone').html('********');
            }

            //  判断收藏情况

            is_coll(is_collect);
            collect(userId,title,url,3,stringId,is_collect);



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
                        window.location.href='memberInfo://'  + user_id  +'/'+3 +'/'+contacts+ '/'+3;
                    }else if($(".user_info_box").css('display')=='none'){
                        window.location.href='reclaim://'+3 +"/" + user_id + "/"+ stringId;
                    }
                }
                else if(/android/.test(ua)){
                    if($('.user_info_box').css('display')=='block'){
                        javascript:android.memberInfo(user_id,3,contacts,3)
                    }else if($(".user_info_box").css('display')=='none'){
                        javascript:android.reclaim(3,user_id,stringId)
                    }
                }
            });

        },
        error:function(error){
            if(error.status==404){console.log("页面为找到")}
            else if(error.status==500){console.log("服务器内部错误！")}
        }
    })

    //浏览增加

    add(webUrl+'recruitment/main/addbrowse',stringId);
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
        javascript:android.report(3,stringId,user_id, isReport)
    }else if(url.indexOf('ios')!=-1){
        window.location.href = "report://" + 3 +"/"+stringId + "/"+user_id + "/"+ isReport;
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
var first_img;
function openChattingList(){
    var chat=encodeURI(title);
    if(url.indexOf('android')!=-1){
        javascript:android.openChattingList(im_user_id,'',title)
    }else if(url.indexOf('ios')!=-1){
        alert()
        window.location.href = "liaotian://" + chat +"&"+first_img + "&"+im_user_id + "";
    }

}
