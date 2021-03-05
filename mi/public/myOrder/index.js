// 选项卡切换

$("ul.tab li").on("click", function() {
	if ($(this).hasClass("active")) return;
	$(this).addClass("active").siblings(".active").removeClass("active");
	$(".order-message>div").eq($(this).index()).addClass("active").siblings(".active").removeClass("active");
})

// 渲染全部商品

$.myAjax({
	url: "/order/list_all",
	success: function(data) {
		// console.log(data)
		data.forEach((item, index) => {
			// console.log(item)
			$(
				`
            <li data-id="${item.orderId}">
                <div class="tatil">
                    <i></i>
                    <p>小米自营</p>
                    <span>已取消</span>
                </div>
                <ul class="oneOrder yiOrder">
                    
                </ul>
                <div class="allTotil">
                    <p>共<span>${item.details.length}</span>件商品</p>
                    <p>总金额</p>
                    <p><span>￥</span><span class="orderPrice">
                    ${item.account}
                    </span><span>.00</span></p>
                </div>
                <div class="sub-bottom">
                    <span class="delete">删除订单</span>
                    <p>再次购买</p>
                </div>
            </li>
            `
			).appendTo("ul.allOrder");
			item.details.forEach(items => {
				// console.log(items)
				$(
					`
                <li class="myCart_shop-shop">
                    <div class="shop_img">
                        <img src="${items.avatar}" alt="">
                    </div>
                    <div class="shop_info">
                        <div class="shop_name">${items.name}</div>
                            <div class="shop_price">
                                <p><span>￥</span>${items.price}</p>
                                <div class="calculation">
                                <span class="num">X${items.count}</span>
                            </div>
                        </div>
                        <div class="otherBox"></div>
                    </div>
                </li>
                    
                `
				).appendTo($('.oneOrder').eq(index));

			})
		})


		// 删除订单
		$(".delete").on("click", function() {
			var num = $(this).parents("li")[0].dataset.id;
			layer.open({
				content: '确认删除订单？',
				btn: ['确认', '取消'],
				yes: function(index) {
					$.myAjax({
						url: `/order/remove/${num}`,
						success: function() {

							history.go(0)
						}
					})
				}
			});

		})

	}
})


// 获取当前登录用户所有已付款订单信息

$.myAjax({
	url: "/order/list_pay",
	success: function(data) {
		console.log(data)
		data.forEach((item, index) => {
			// console.log(item)
			console.log(index)
			$(
				`
            <li data-id="${item.orderId}">
                <div class="tatil">
                    <i></i>
                    <p>小米自营</p>
                    <span>已付款</span>
                </div>
                <ul class="onePayOrder yiOrder">
                    
                </ul>
                <div class="allTotil">
                    <p>共<span>${item.details.length}</span>件商品</p>
                    <p>总金额</p>
                    <p><span>￥</span><span class="orderPrice">
                    ${item.account}
                    </span><span>.00</span></p>
                </div>
                <div class="sub-bottom">
                    <span class="delete">删除订单</span>
                    <p>再次购买</p>
                </div>
            </li>
            `
			).appendTo("ul.received");
			item.details.forEach(items => {
				// console.log(items)
				$(
					`
                <li class="myCart_shop-shop">
                    <div class="shop_img">
                        <img src="${items.avatar}" alt="">
                    </div>
                    <div class="shop_info">
                        <div class="shop_name">${items.name}</div>
                            <div class="shop_price">
                                <p><span>￥</span>${items.price}</p>
                                <div class="calculation">
                                <span class="num">X${items.count}</span>
                            </div>
                        </div>
                        <div class="otherBox"></div>
                    </div>
                </li>
                    
                `
				).appendTo($('.onePayOrder').eq(index));

			})
		})
		// 删除订单
		$(".delete").on("click", function() {
			var num = $(this).parents("li")[0].dataset.id;
			layer.open({
				content: '确认删除订单',
				btn: ['确认', '取消'],
				yes: function(index) {
					$.myAjax({
						url: `/order/remove/${num}`,
						success: function() {

							history.go(0)
						}
					});
				}
			});

		});

	}
})

// 获取当前登录用户所有待付款订单信息

$.myAjax({
	url: "/order/list_unpay",
	success: function(data) {
		console.log(data)
		data.forEach((item, index) => {
			// console.log(item)
			console.log(index)
			$(
				`
            <li data-id="${item.orderId}">
                <div class="tatil">
                    <i></i>
                    <p>小米自营</p>
                    <span>待付款</span>
                </div>
                <ul class="oneWaitPayOrder yiOrder">
                    
                </ul>
                <div class="allTotil">
                    <p>共<span>${item.details.length}</span>件商品</p>
                    <p>总金额</p>
                    <p><span>￥</span><span class="orderPrice">
                    ${item.account}
                    </span><span>.00</span></p>
                </div>
                <div class="sub-bottom">
                    <span class="delete">删除订单</span>
                    <p>再次购买</p>
                </div>
            </li>
            `
			).appendTo("ul.alreadyPaid");
			item.details.forEach(items => {
				// console.log(items)
				$(
					`
                <li class="myCart_shop-shop">
                    <div class="shop_img">
                        <img src="${items.avatar}" alt="">
                    </div>
                    <div class="shop_info">
                        <div class="shop_name">${items.name}</div>
                            <div class="shop_price">
                                <p><span>￥</span>${items.price}</p>
                                <div class="calculation">
                                <span class="num">X${items.count}</span>
                            </div>
                        </div>
                        <div class="otherBox"></div>
                    </div>
                </li>
                    
                `
				).appendTo($('.oneWaitPayOrder').eq(index));

			})
		})
		// 删除订单
		$(".delete").on("click", function() {
			var num = $(this).parents("li")[0].dataset.id;
			layer.open({
				content: '确认删除订单',
				btn: ['确认', '取消'],
				yes: function(index) {
					$.myAjax({
						url: `/order/remove/${num}`,
						success: function() {

							history.go(0)
						}
					});
				}
			});

		})

	}
})


// 点击返回个人主页

$(".icon-back1").on("click", () => {
	window.location.href = "/profile/index.html"
})
