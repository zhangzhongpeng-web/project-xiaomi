 var id = window.location.search.slice(5);

$(".return").click(function(){
	window.location.href = '/list/index.html'
})


// 获得轮播图的图片
 $.myAjax({
	  url:	`/product/model/${id}`,
	  
	  success: function(data){console.log(data)
		  // console.log(data.bannerImgs)
			 var str = data.bannerImgs;
			 var n = str.split(",");			 			 
			 n.forEach(function(item){
				 $(
				 `<div class="swiper-slide"><img src="${item}" /> </div>
				 				
				 
				 `
				 ).appendTo('.swiper-wrapper');
				 
			 })
		 
	  },
	   
  });

  // 轮播图下面的文字渲染
  $.myAjax({
	  url:	`/product/model/${id}`,
	  success: function(data){
		  $(`
			<span class="price">￥${data.price}</span><div class="shoucang"><i class="iconfont icon-shoucang"></i><span style="font-size:11px;color:#666;">收藏</span></div></br>
			<div class="logo">
			<i class="iconfont icon-xiaomi"></i>
			<span>自营</span>
			
			</div>
			<span class="name">${data.name}</span></br>
			<span class="brief">${data.brief}</span>
		  `).appendTo(".swiper-container")
	  }
  })
  
 // 商品详情图片
 $.myAjax({
 	  url:	`/product/model/${id}`,
 	  
 	  success: function(data){
 		  // console.log(data.otherImgs)
 			 var str = data.otherImgs;
 			 var n = str.split(",");			 			 
 			 n.forEach(function(item){
 				 $(
 				 `
				 <div class="containner-imgs"><img src="${item}" /> </div>
 				 				
 				 `
 				 ).appendTo('.containner');
 				 
 			 })
 		 
 	  },
 	   
  });
 
  
  // 轮播图
 setTimeout(function(){
     var mySwiper = new Swiper ('.swiper-container', {
         autoplay: {
             disableOnInteraction:false,
             delay: 3000,
             stopOnLastSlide: false,
         } , 
         loop: true,
         pagination: {
             el: '.swiper-pagination',
         }
     }) 
     
 },500)
 
 // 划到一定高度显示导航栏
 $(window).scroll(function(){
	
	 if($(this).scrollTop() >= 30){
		 
		 $(".page-hidden").fadeIn(1500,function(){});
		 // 返回图标渐出
		 $(".return").fadeOut(1000,function(){});
	 }else{
		 $(".page-hidden").fadeOut(1000,function(){});
		 $(".return").fadeIn(1000,function(){});
	 }
 })

// 弹窗渲染部分
$.myAjax({
	  url:	`/product/model/${id}`,
	  
	  success: function(data){
		  console.log(data.avatar)
			
				 $(
				 `
				 <div class="pop-img"><img src="${data.avatar}" /> </div>
				  <span></span>
				 <span class="price1">￥${data.price}</span>
				 
				 <div class="checked">已选: <span class="number">1</span>件</div>
				 <img class="icon" src="img/close_circle_grey_new.png" >
				
				 `
				 ).appendTo('.pop-content_head');
		 
	  },
	   
  });
  
  
  console.log($(".product-count").html())
  
  // 数量加的效果
  $(".add").click(function(){
      var n = $(this).prev().html();
	  var num = parseInt(n)+1;
	  if(num == 0 || num > 5){
		  layer.open({
		     content: '商品数量已达到最大了吆'
		     ,skin: 'msg'
		     ,time: 2 //2秒后自动关闭
		   });
		  return;
		  }
	  $(this).prev().html(num);
	  $(".number").html(num);
	  $(".Selected span").eq(1).html(num + '件');
	  
  });
 
	//减的效果
	$(".less").click(function(){
	    var n=$(this).next().html();
	    var num=parseInt(n)-1;
	    if(num == 0 || num > 5){ 
			 layer.open({
			    content: '商品数量已达到最小了吆'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
			  });
			return;
		}
	    $(this).next().html(num);
		$(".number").html(num);
		$(".Selected span").eq(1).html(num + '件')
		
	});
	
	// 弹窗升起与关闭事件
	$(".aging").click(function(){
		
		$(".pop").animate({height:'100%'},800)
		
		// 弹窗关闭按钮
		$(".icon").click(function(){
			$(".pop").animate({height:'-100%'},500)
		});
		
		// 点击暗处仍可关闭
		$(".pop-head").click(function(){
			$(".pop").animate({height:'-100%'},500)
		});
	})
	
	// 已选栏
	$(".Selected").click(function(){
		
		$(".pop").animate({height:'100%'},800)
		
		// 弹窗关闭按钮
		$(".icon").click(function(){
			$(".pop").animate({height:'-100%'},500)
		});
		
		// 点击暗处仍可关闭
		$(".pop-head").click(function(){
			$(".pop").animate({height:'-100%'},500)
		});
	})
	
	
// 请求ajax把数量传输到数据库
	$(".shopcart").click(function(){
		var num = $(".value").html();
		$.myAjax({
			url: "/cart/add",
			type: "post",
			data: {
				pid: id,
				count: num,
			},
			success: function(){
				layer.open({
				   content: '添加成功'
				   ,skin: 'msg'
				   ,time: 2 //2秒后自动关闭
				 });
				 history.go(0)
			}
		})
	})
	
	$(".shopcart").click(function(){
		allNumber()
	})
	
	function allNumber() {
		$.myAjax({
			url: "/cart/total",
			success: function(data){
				$(".product-count").html(data);
				
			},
			
		})
	}
	allNumber()