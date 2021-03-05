var index = 0;//记录当前是第几张轮播图处于激活状态（从0开始）
var bannerTimer = null;// 用于开始停止计时器
var bannerLength = $(".swiper-slide").length;
// 收尾拼接，无缝衔接
// 复制最后一个到最前面
$(".swiper-slide").last().clone().prependTo(".swiper-wrapper");
// 复制原来第一个到最后面
$(".swiper-slide").eq(1).clone().appendTo(".swiper-wrapper");

// 最底层的播放公共函数
// 图片轮播切换（我不知道动画要到哪张，主要看全局变量index，但是我要保证动画结束了，index是一个有效的值
function move(){
    var i ,isNeedReset = false;
    if(index < 0){
        i = bannerLength - 1;
        isNeedReset = true;
    }else if(index === bannerLength){
        i = 0;
        isNeedReset = true;
    }else{
        i = index;
    }
    // 分页器同步运动
    $(".swiper-pagination li").eq(i).addClass("active").siblings(".active").removeClass("active");
    // 图片动 // stop()很关键
    $(".swiper-wrapper").stop().animate({"left":`${-1*index}00%`},1000,function(){
        // 判断是否需要回到初始位置
        // 重置
        if(isNeedReset){
            $(this).css({"left":`${-1*i}00%`})
        }
        index = i;
    })
}
// 公共函数自动播放
function autoPlay(){
    bannerTimer = setInterval(function(){
        index++;
        move()
    },3000)
}

// 前一页后一页
$(".swiper-prev").on("click",function(){
    if($(".swiper-wrapper").is(":animated")) return;
    index--;
    move()
})
$(".swiper-next").on("click",function(){
    if($(".swiper-wrapper").is(":animated")) return;
    index++;
    move()
})

// 划过停止划出继续
$(".swiper-container")
    .on("mouseover",function(){clearInterval(bannerTimer);})
    .on("mouseout",function(){autoPlay();})

//点击分页器切换
$(".swiper-pagination").on("click","li",function(){
    if($(this).hasClass("active")) return;
    index = $(this).index();
    move();
})


// 导火索代码
autoPlay();





