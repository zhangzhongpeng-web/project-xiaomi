$(".icon-back1").click(function() {
	window.location.href = '/category/index.html'
})


// 接收分类页传过来的东西
var id = window.location.search.slice(5);



$.myAjax({
	url: "/product/list",
	type: "post",
	data: {
		"name": "",
		"cid": 17,
		"orderCol": "price",
		"orderDir": "asc",
		"begin": 0,
		"pageSize": 6
	},
	success: function(data) {
		console.log(data)
		data.forEach(function(item) {
			$(
				`
						<li class="more" data-id=${item.id}>
							<div class="img">
							<img src="${item.avatar}" />
							</div>
							
							<p class="text">
								<span class="name">${item.name}</span>
								<span class="brief">${item.brief}</span>
								<span class="price">￥${item.price}</span>
								<span style="font-size:11px;color:#999">月销${item.sale}</span>
								<span class="pinglun">${item.rate}条评论</span>
							</p>
						</li>
					  
					  `
			).appendTo('.page-product')
		})
			$(".more").click(function() {
			
				window.location.href = `/detail/index.html?cid=${this.dataset.id}`
				console.log(this.dataset.id)
			})
		
	},

})

// 把信息传给下个页面



// 给小图标设置点击事件,实现排版切换
$(".list").click(function() {
	$(this).toggleClass('icon-List icon-list');
	$(".page-product").toggleClass('show');
})


var sort = "asc";
// 价格排序
$(".theAdd").click($.debounce(function() {
	sort == "asc" ? sort = "desc" : sort = "asc";
	$(".jiantou").toggleClass('icon-top icon-bottom');
	$(".page-product").empty();

	$.myAjax({
		url: "/product/list",
		type: "post",
		data: {
			"name": "",
			"cid": 17,
			"orderCol": "price",
			"orderDir": sort,
			"begin": 0,
			"pageSize": 6
		},
		success: function(data) {
			console.log(data)
			data.forEach(function(item) {
				$(
					`
							<li class="more" data-id=${item.id}>
								<div class="img">
								<img src="${item.avatar}" />
								</div>
								
								<p class="text">
									<span class="name">${item.name}</span>
									<span class="brief">${item.brief}</span>
									<span class="price">￥${item.price}</span>
									<span style="font-size:11px;color:#999">月销${item.sale}</span>
									<span class="pinglun">${item.rate}条评论</span>
								</p>
							</li>
						  
						  `
				).appendTo('.page-product')
			})
			 $(".more").click(function() {
			
				window.location.href = `/detail/index.html?cid=${this.dataset.id}`
				console.log(this.dataset.id)
			})
		}
	})

}, 1000))



// 销量排序
$(".theSale").click($.debounce(function() {
	$(".page-product").empty();

	$.myAjax({
		url: "/product/list",
		type: "post",
		data: {
			"name": "",
			"cid": 17,
			"orderCol": "sale",
			"orderDir": "desc",
			"begin": 0,
			"pageSize": 6
		},
		success: function(data) {

			data.forEach(function(item) {
				$(
					`
							<li class="more" data-id=${item.id}>
								<div class="img">
								<img src="${item.avatar}" />
								</div>
								
								<p class="text">
									<span class="name">${item.name}</span>
									<span class="brief">${item.brief}</span>
									<span class="price">￥${item.price}</span>
									<span style="font-size:11px;color:#999">月销${item.sale}</span>
									<span class="pinglun">${item.rate}条评论</span>
								</p>
							</li>
						  
						  `
				).appendTo('.page-product')
			})
			$(".more").click(function() {
			
				window.location.href = `/detail/index.html?cid=${this.dataset.id}`
				console.log(this.dataset.id)
			})
		}
	})
}, 1000));
// 评论排序
$(".theSpeak").click($.debounce(function() {

	sort == "asc" ? sort = "desc" : sort = "asc";

	$(".page-product").empty();

	$.myAjax({
		url: "/product/list",
		type: "post",
		data: {
			"name": "",
			"cid": 17,
			"orderCol": "price",
			"orderDir": sort,
			"begin": 0,
			"pageSize": 6
		},
		success: function(data) {
			console.log(data)
			data.forEach(function(item) {
				$(
					`
							<li class="more" data-id=${item.id}>
								<div class="img">
								<img src="${item.avatar}" />
								</div>
								
								<p class="text">
									<span class="name">${item.name}</span>
									<span class="brief">${item.brief}</span>
									<span class="price">￥${item.price}</span>
									<span style="font-size:11px;color:#999">月销${item.sale}</span>
									<span class="pinglun">${item.rate}条评论</span>
								</p>
							</li>
						  
						  `
				).appendTo('.page-product')
			})
			$(".more").click(function() {
			
				window.location.href = `/detail/index.html?cid=${this.dataset.id}`
				console.log(this.dataset.id)
			})
		}
	})

}, 1000));


$("#theInput").change($.debounce(function() {
	$(".page-product").empty();
	$.myAjax({
		url: "/product/list",
		type: "post",
		data: {
			"name": $("#theInput").val(),
			"cid": 17,
			"orderCol": "price",
			"orderDir": "desc",
			"begin": 0,
			"pageSize": 6
		},
		success: function(data) {
			console.log(data)
			data.forEach(function(item) {
				$(
					`
							<li class="more" data-id=${item.id}>
								<div class="img">
								<img src="${item.avatar}" />
								</div>
								
								<p class="text">
									<span class="name">${item.name}</span>
									<span class="brief">${item.brief}</span>
									<span class="price">￥${item.price}</span>
									<span style="font-size:11px;color:#999">月销${item.sale}</span>
									<span class="pinglun">${item.rate}条评论</span>
								</p>
							</li>
						  
						  `
				).appendTo('.page-product')
			})
			$(".more").click(function() {
			
				window.location.href = `/detail/index.html?cid=${this.dataset.id}`
				console.log(this.dataset.id)
			})
		}
	})
}, 1000));

// 滚动加载更多

$(".page-content").scroll(function(){
	
		var begin = 0;
	if($(this).scrollTop() >= 291 ){
		begin+=6
		$.myAjax({
			url: "/product/list",
			type: "post",
			data: {
				"name": "",
				"cid": 17,
				"orderCol": "price",
				"orderDir": "asc",
				"begin": begin,
				"pageSize": 6
			},
			success: function(data) {
				
				data.forEach(function(item) {
					$(
						`
								<li class="more" data-id=${item.id}>
									<div class="img">
									<img src="${item.avatar}" />
									</div>
									
									<p class="text">
										<span class="name">${item.name}</span>
										<span class="brief">${item.brief}</span>
										<span class="price">￥${item.price}</span>
										<span style="font-size:11px;color:#999">月销${item.sale}</span>
										<span class="pinglun">${item.rate}条评论</span>
									</p>
								</li>
							  
							  `
					).appendTo('.page-product')
				})
					$(".more").click(function() {
					
						window.location.href = `/detail/index.html?cid=${this.dataset.id}`
						console.log(this.dataset.id)
					})
				
			},
		
		})
	};
});

// var Allhight = $(".page-container").outerHeight(true);

// var Scrollhight = Allhight - $(".page-container").height();
// console.log(Scrollhight)
