// 用户名密码登录与手机验证码登陆模式的切换
$('button.btn-toggle').on('click',function(){
	$('.login-pwd, .login-phone').toggleClass("show");
	
});
// 手机号验证码登录
$('button.btn-login-phone').on('click',function() {
	alert('手机号验证码登录功能暂未开放，请切换为用户密码登录！');
});
// 用户名密码登录
$('button.btn-login-pwd').on('click',function(){
	$.ajax({
		url:  "/user/login_pwd",
		type:  "post",
		  // headers节点用于设置请求头
		headers: {
			"Content-Type":  "application/json"
		},
		// 怎么把用户输入的用户名和密码发给服务器
		data: JSON.stringify( {
			name:  $('input.name').val().trim(),
			pwd:  $('input.pwd').val()
		}),
		success: function(result){
			// 回来的是什么 token令牌
			if( result.code === 200 ){
				sessionStorage.setItem("token",result.data);
				// 拿到用户名
				sessionStorage.setItem("name",$('input.name').val().trim())
				window.location.replace("/profile/index.html");
			}else{
				alert(result.msg)
			}
		}
	})
})
