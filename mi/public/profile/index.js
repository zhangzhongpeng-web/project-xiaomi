// 判断有没有登录,登录之后显示用户名
if ( sessionStorage.getItem("token") == null ) {
	$(".header .left span").text('请登录');
	$(".header .left span").click(function(){
		window.location.href = "/login/index.html";
	})
} else{
	
	$(".header .left span").text(sessionStorage.getItem("name"));
	
};
// 退出按钮
$(".btn-esc").click(function(){
		console.log(1)
		sessionStorage.clear();
		history.go(0);
	})

// 登录之后才可以管理地址
if( sessionStorage.getItem("token")!== null ){
  $(".msg-list li").eq(2).click(function(){
	  window.location.href = "/profile/adddress/index.html"
  })

}
//去我的订单页
$(".order").click(function(){
	window.location.href = "/myOrder/index.html"
})