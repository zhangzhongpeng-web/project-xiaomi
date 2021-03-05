var str = window.location.search.slice(5);
console
var arr111 = str.split("-")
var Id
// console.log(arr111)

$(".icon-back1").click(function() {
	history.go(-1)
})

			var total = 0;
// 请求ajax渲染商品内信息

$.myAjax({
	url: "/cart/list_ids",
	type: "post",
	data: {
		ids: arr111
	},
	success: function(data) {
		data.forEach(function(item) {
			$(
				`
				<div class="goodsProduct">
					<div class="goodsImg">
						<img src="${item.avatar}" />
					</div>
					
					<div class='texts'data-count=${item.count} data-price="${item.price}">
						<div class="name">${item.name}</div>
						<span class="price">￥${item.price}<span class="nummore">.00</span></span>
						<div class="serverce">7天无理由退货</div>
					</div>
					<div class='num'>× ${item.count}</div>
				</div>
				
				`
			).appendTo('.goods');


			$(".texts").each(function(i, item) {
				total += $(item).attr("data-count") * $(item).attr("data-price");
			});
			$(".order-footer_price").text('￥' + total + '.00');



		});

	},


});

// 请求ajax渲染地址信
$.myAjax({
	url: "/address/get_default",
	success: function(item) {
		
		$(
			`
				<div class="address">
				
				<span class="address1">${item.receiveName}</span>
				<span class="address2">${item.receivePhone}</span></br>
					
				<span class="address3">${item.receiveRegion}</span>
				<span class="address4">${item.receiveDetail}</span>
				<i style="position:absolute;right:10px;bottom:24%;" class="iconfont icon-you"></i>
				</div>
				`
		).appendTo('.ress')

	}
})

// 弹窗效果
$(".ress").click(function() {

	$(".hide-address").stop().animate({
		height: "100%"
	}, 200)
	$(".hide-address_top").click(function(){
		$(".hide-address").stop().animate({height:'0%'},400);
	})
	
	$(".choise img").click(function(){
		$(".hide-address").stop().animate({height:'0%'},400);
	})
	
	// 点击每一个单选框之后把下面地址信息改到上面
	$(".every input").click(function(){
		
			var name = $(this).parents('.every').find('.name').text();
			var phone = $(this).parents('.every').find('.phone').text();
			var region = $(this).parents('.every').find('.region').text();
			var detail = $(this).parents('.every').find('.detail').text();
			$(".address1").text(name);
			$(".address2").text(phone);
			$(".address3").text(region);
			$(".address4").text(detail);			
		Id = $(".every input").parents('div')[0].dataset.id;	
		
	})
})
// 渲染所有地址
$.myAjax({
		url: "/address/list",
		success: function(data){
			console.log(data)
			$(".hide-address_bottom_li").empty();
			data.forEach(function(item){
				
				$(`
					<div class="every" data-id = ${item.id}>
						<input type="radio" name="1" id="" value="" />
						<div class="head">
							
							<span class="name">${item.receiveName}</span>
							<span class="phone">${item.receivePhone}<span>
						</div>
						
						<div class="bottom">
							<span class="region">${item.receiveRegion}</span>
							<span class="detail">${item.receiveDetail}</span>
							<i class="iconfont icon-edit"></i>
						</div>
					</div>
					
					`).appendTo('.hide-address_bottom_li')
			})
		}
	});

	$(".icon-edit").click(function(){
		window.location.href = "/profile/adddress/edit.html"
	})
	
	$(".submit").click(function(){
		
		$.myAjax({
			url: "/order/confirm",
			type: "post",
			data: {
				ids: arr111,
				account: total,
				addressId: Id
			},
			success: function(data){
				console.log(data)
				window.location.href = `/pay/index.html?${data}`;
			}
		})
	})