
// 倒计时
var SysSecond; //系统秒
var InterValObj; //时间间隔
$(document).ready(function() {
    SysSecond = parseInt($("#remainSeconds").html()); //这里获取倒计时的起始时间 
    InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行 
});
//将时间减去1秒，计算天、时、分、秒 
function SetRemainTime() {
    if (SysSecond > 0) {
        SysSecond = SysSecond - 1;
        var second = Math.floor(SysSecond % 60); // 计算秒     
        var minite = Math.floor((SysSecond / 60) % 60); //计算分 
        var hour = Math.floor((SysSecond / 3600) % 24); //计算小时 
        $("#remainTime").html(hour + "小时" + minite + "分" + second + "秒");
    } else { //剩余时间小于或等于0的时候，就停止间隔函数 
        window.clearInterval(InterValObj);
        //这里可以添加倒计时时间为0后需要执行的事件 
    }
}

// 获得订单编号
var num = window.location.search.slice(1);
console.log(num)

// 获得订单的总金额

$.myAjax({
    url: `/order/account/${num}`,
    success: function(data){
        $(`
            <div class="total">
                <span>￥</span>${data}.00
            </div>
        `).prependTo(".productTotal");

        $(".money").html(`${data}`)
    }
})


// 点击确认支付支付成功

$(".confirm").on("click",function(){
    
    layer.open({
        content: '支付成功'
        ,skin: 'msg'
        ,time: 1 //1后自动关闭
    });
    setTimeout(function(){
        window.location.href = "/myOrder/index.html";
    },1000)

    $.myAjax({
        url: `/order/pay/${num}`,
        success:function(){
            
        }
    })
})

// 点击返回按钮返回询问是否确认离开
$(".icon-back1").on("click",function(){
    
    layer.open({
        content: '您确定要离开吗？超时后您的订单将被取消'
        ,btn: ['离开', '不要']
        ,yes: function(index){
            history.go(-1);
        }
    });
})