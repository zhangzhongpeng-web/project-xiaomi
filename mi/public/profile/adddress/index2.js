
$(".containner_btn button").click(function(){
	
	$.ajax({
		url:  "/address/add",
		type:  "post",
		headers:  {
			"Authorization":  sessionStorage.getItem("token"),
			 "Content-Type":  "application/json"
		},
		data:  JSON.stringify({
			 receiveName:    $(".name").val().trim(),
			 receivePhone:   $(".phone").val().trim(),
			 receiveRegion:  $(".where").val(),
			 receiveDetail:	 $(".more").val().trim(),
		}),
		success: function(result){
			if(result.code === 200){
				window.location.replace('index.html')
				}
			} 
		
	})
	
	
})

$(".containner_top img").click(function(){
	history.go(-1)
})
