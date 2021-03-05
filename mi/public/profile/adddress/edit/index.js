var id = window.location.search.slice(5);
console.log(id)

// 渲染,将拿到id之后的信息传输给修改页面
$.ajax({
	url:  `/address/model/${id}`,
	type:  "get",
	headers:  {
		"Authorization":  sessionStorage.getItem("token"),
		"Content-Type":  "application/json"
	},
	success: function(result){
		if(result.code === 200){
			$(".name").val(result.data.receiveName),
			$(".phone").val(result.data.receivePhone),
			$(".where").val(result.data.receiveRegion),
			$(".more").val(result.data.receiveDetail)
		}
	}
})

// 点击保存按钮之后进行修改
$(".containner_btn button").on('click',function(){
	$.ajax({
		url: "/address/update",
		type:  "post",
		headers:  {
			"Authorization":  sessionStorage.getItem("token"),
			"Content-Type":  "application/json"
		},
		data:  JSON.stringify({
			id:  `${id}`,
			receiveName:    $(".name").val().trim(),
			receivePhone:   $(".phone").val().trim(),
			receiveRegion:  $(".where").val(),
			receiveDetail:	 $(".more").val().trim(),
		}),
		success: function(result){
			if(result.code === 200){
				window.location.replace("/profile/adddress/index.html")
			}
		}
	})
	
	// 保存后判断默认地址
	
		
		
	
	
})

// 箭头跳转
$(".containner_top img").click(function(){
	history.go(-1)
})
$(".ipt").click(function(){
	if ( $(".ipt").prop("checked") == true ) {
		$(".artical").text("默认地址")
	} else{
		$(".artical").text("设为默认地址")
	}
})