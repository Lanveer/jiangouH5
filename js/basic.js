//本地数据
//webUrl='http://192.168.199.103:9527/index.php?r=';
//阿里云
//  host='http://106.14.56.22:9527/index.php?';
//亚马逊
  webUrl = 'https://www.jglist.com:9527/index.php?r=';
//获取地址栏Id

//图片后缀

largeImg= '800_600.jpg';
smallImg= '200_200.jpg';

topic_url='https://www.jglist.com:9527/index.php?r=';
function getQueryString(str){
    var ret = {};
    var query = str ? str.substr(str.indexOf('?')) : window.location.search.substr(1);
    query.replace(/(\w+)=(\w+)/ig, function(a, b, c, d){
//      console.log(arguments);
        ret[b] = unescape(c);
    });
    return ret;
}

//获取到当前的url
 url = window.location.href;
 str =url;
 re = getQueryString(str);
 stringId= re.id,
    userId= re.userId,
    plat=re.platform;
    cityId=re.cityId;
//打印出参数
console.log(stringId);
console.log(userId);
console.log(plat);
console.log(cityId);


//安卓注释掉导航栏
if(plat=='android'){
    $('.top').hide()
}else if(plat=='ios'){
    $('.top').hide()
}


//弹出提示框
var mask= $('<div id="mask" style="width: 100%;height: 100%;background: #000;position: fixed;z-index: 99999;opacity:.7;display: none;"></div>')
var collect_status='<div class="collect-status" style="width: 50%;height: 50pt;background: #fff;position: fixed;left: 50%;margin-left: -25%;top: 50%;margin-top: -25pt;z-index: 999999;display: none;"><h1 style="font-weight: normal;font-size: 10pt;text-align: center;line-height: 50pt;color: #282828"></h1></div>'
$('body').append(mask);
$("body").append(collect_status);

function showTips(text){
   $('#mask,.collect-status').fadeIn(500);
   $('.collect-status>h1').html(text);
}

function hideTips(){
    $('#mask,.collect-status').fadeOut(500);
}

function autoCloseTips(){
    setTimeout(function(){hideTips()},500)
}


//获取is_collect的值

function is_coll(va){
  var is_collect=va;
    if(is_collect==0){
        $(".collect").css({
            'background-image':'url("../imgs/basic/collect.png")'
        });
        $('.footer-collect>span>img').attr('src','../imgs/basic/benifit-collect.png');
        $('.footer-collect>img').attr('src','../imgs/basic/shake/collect.png');

    }else if(is_collect==1){
        $(".collect").css({
            'background-image':'url("../imgs/basic/collected.png")'
        });
        $('.footer-collect>span>img').attr('src','../imgs/basic/benifit-collected.png');
        $('.footer-collect>img').attr('src','../imgs/basic/shake/collected.png');
    }
}

//收藏通用
function collect(userId,title,url,type,stringId,is_collect){
    $(".collect,.restore,.footer-collect>img").click(function(){
        if(is_collect==0){
            $(".collect").css({
                'background-image':'url("../imgs/basic/collected.png")'
            });

            $('.footer-collect>span>img').attr('src','../imgs/basic/benifit-collected.png');
//            $('.footer-collect>img').attr('src','../imgs/basic/shake/collected.png');
            var add_collect_url= webUrl+'personal/main/addcollect';
            $.ajax({
                url:add_collect_url,
                type:'post',
                dataType:'json',
                data:{user_id:userId,title:title,url:url,type:type,id:stringId},
                success:function(d){
                    console.log(d.error);
                    if(d.error==418){
                        $(".collect").css({
                            'background-image':'url("../imgs/basic/collect.png")'
                        });
                        $('.footer-collect>span>img').attr('src','../imgs/basic/benifit-collect.png');

                        $('.footer-collect>img').attr('src','../imgs/basic/shake/collect.png');
                        showTips('收藏失败');
                    }else if(d.error==0){

                        $('.footer-collect>span>img').attr('src','../imgs/basic/benifit-collected.png');
                        $(".collect").css({
                            'background-image':'url("../imgs/basic/collected.png")'
                        });
                        $('.footer-collect>img').attr('src','../imgs/basic/shake/collected.png');
                        showTips('收藏成功');
                    }
                    autoCloseTips();
                },error:function(e){
                    if(e.status==404){'未找到页面'}else if(e.status==500){console.log('添加收藏服务器失败')}
                }
            });
            is_collect=1;
        }else if(is_collect==1){
            $(".collect").css({
                'background-image':'url("../imgs/basic/collect.png")'
            });
            $('.footer-collect>span>img').attr('src','../imgs/basic/benifit-collect.png');

//            $('.footer-collect>img').attr('src','../imgs/basic/shake/collect.png');

            var delete_collect_url=webUrl+'personal/main/cancelcollect';
            $.ajax({
                url:delete_collect_url,
                type:'post',
                dataType:'json',
                data:{user_id:userId,id:stringId,type:type},
//                        data:{user_id:114,id:2},
                success:function(del){
                    console.log(del);
                    if(del.error>0){
                        $(".collect").css({
                            'background-image':'url("../imgs/basic/collected.png")'
                        });
                        $('.footer-collect>span>img').attr('src','../imgs/basic/benifit-collected.png');

                        $('.footer-collect>img').attr('src','../imgs/basic/shake/collected.png');

                        showTips('取消失败')
                    }else if(del.error==0){
                        $(".collect").css({
                            'background-image':'url("../imgs/basic/collect.png")'
                        });
                        $('.footer-collect>span>img').attr('src','../imgs/basic/benifit-collect.png');

                        $('.footer-collect>img').attr('src','../imgs/basic/shake/collect.png');

                        showTips('取消成功');

                    }
                    autoCloseTips();
                },error:function(err){
                    if(err.status==404){console.log("未找到")}
                    else if(err.status==500){
                        console.log("删除收藏服务器错误！")
                    }
                }
            });
            is_collect=0
        }
    });
}


//浏览次数增加1

function add(url,stringId){
    $.ajax({
        type:'post',
        dataType:'json',
        url:url,
        data:{id:stringId},
        success:function(data){
            console.log(data);
        },
        error:function(error){
            if(error.status==400){
                console.log('there is no rwsources')
            }else if(error.status==500){
                console.log("服务器内部出错")
            }
        }
    })
}


try{
    $('#demo4').swiper({
        pagination: '#demo4 .swiper-pagination',
        paginationclickable: true,
        spaceBetween: 30,
        nextButton: '#demo4 .swiper-button-next',
        prevButton: '#demo4 .swiper-button-prev',
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
    });

}catch(e){
    console.log(e)
}




//动态加载Mask的长度和宽度

function showBigImg(){
    $(".Mask").show();
    $('.Mask').css({
        opacity:1,
        zIndex:'99999'
    });
}


$(".Mask_close").click(function(){
    $(".Mask1").hide()
});



//弹出回复框
function do_com(obj){
    var box= $(obj).parent().parent().next();
    var receiveId= box.parent().next().find('.receive_user_id').html()
    if(userId == receiveId){
        showTips('自己不能给自己评论！');
        autoCloseTips();
        return;
    }else{
        box.slideToggle();
    }
}


//大图展示
function showBigImg1(){
        canBack= "0";
    $(".Mask1").show();
    $('.Mask1').css({
        opacity:1,
        zIndex:'99999'
    });
}

//再次点击图片关闭
function closeImg(){
    canBack= '1';
    $(".Mask1,.Mask").hide();
    $('.Mask1,.Mask').css({
        opacity:0,
        zIndex:'99999'
    });
}


$(".Mask_close").click(function(){
    $(".Mask1").hide()
});


//pingbi
var canBack="1";

function canback(){
    javascript:android.canBack(canBack);
}
