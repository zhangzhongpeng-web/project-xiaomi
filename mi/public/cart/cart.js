var num = 0;
var arr111 = [];
var arr = [];
$.myAjax({
	url: "/cart/list",
	type: "post",
	success: function(data) {
		console.log(data)
		data.forEach(function(item) {
			$(
				`
				<li class="myCart_shop-shop" data-id="${item.id}">
				    <input type="checkbox">
				    <div class="shop_img">
				        <img src="${item.avatar}" alt="">
				    </div>
				    <div class="shop_present;">
				        <div class="shop_name">${item.name}</div>
				        <div class="shop_price">
				            <p><span>￥</span><span class='onePrice'>${item.price}</span></p>
				            <div class="num-btn">
				                <span class="less">-</span>
				                <span class="num">${item.count}</span>
				                <span class="add">+</span>
				            </div>
				        </div>
				        <div class="otherBox">选服务</div>
						<div class="otherBox1"><span>服务</span>    &nbsp;安装服务|延长保障</div>
				    </div>
				</li>
               
            
            `
			).appendTo(".page_shop-shops");
		});
		// 加减按钮加的效果
		$(".add").click($.debounce(function() {

			var n = $(this).prev().html();
			var num = parseInt(n) + 1;
			if (num == 0 || num > 5) {
				$(this).css("color", "#afafaf")
				layer.open({
					content: '商品数量已达到最大了吆',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				return;
			}

			$(this).siblings('.num').html(num);
			$(this).siblings('.less').css("color", "#000");

			// 增加购物信息需要发送ajax
			var id = parseInt($(this).parents('li')[0].dataset.id)

			$.myAjax({
				url: `/cart/increase/${id}`,
				type: "post",
				success: function() {

				}
			});
			// 如果点击加号按钮的同时判断其是否为选中状态
			if ($(this).parents('li').find('input').prop('checked')) {

			
				var onePrice = Number($(this).parents('li').find('.onePrice').html()) 
				
						
				var jiage = Number( $(".page-price").html().slice(1,5));
				
				jiage += onePrice;
				$(".page-price").html( '￥' + jiage + '.00');
			} else {
			
			}

		}, 1000))

		// 加减按钮减的效果

		$(".less").click($.debounce(function() {

			var n = $(this).next().html();
			var num = parseInt(n) - 1;
			if (num == 0 || num < 1) {
				$(this).css("color", "#afafaf")

				layer.open({
					content: '商品数量已达到最小了吆',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				return;
			}

			$(this).siblings('.num').html(num);
			$(this).siblings('.add').css("color", "#000");

		
		
			// var index = $(this).index(this);
			// var ids = $(this).parents("li")[0].dataset.id;
			// var del1 = arr.indexOf(data[index]);
			// arr.splice(del1, 1);
		
		
			var onePrice = $(this).parents('li').find('.onePrice').html()
			
					
			var jiage = $(".page-price").html().slice(1,5);
			jiage -= onePrice;
			$(".page-price").html( '￥' + jiage + '.00');
			
			// 减少购物信息需要发送ajax
			var id = parseInt($(this).parents('li')[0].dataset.id)

			$.myAjax({
				url: `/cart/decrease/${id}`,
				type: "post",
				success: function() {

				}
			});
		}, 1000));

		// 复选框逻辑
		// 一进来就默认全选
		$(".myCart_shop-top input").prop('checked', true);
		$(".myCart_shop-shop input").prop('checked', true);
		$(".page-footer_left input").prop('checked', true);
		arr = data.concat();
		myThod();
		// 上面全选
		$(".myCart_shop-top input").click(function() {
			if (this.checked) {
				num = data.length
				$(".myCart_shop-shop input").prop('checked', true);
				$(".page-footer_left input").prop('checked', true);

				var index = $(this).index(this);
				arr.push(data[index]);
				arr = data.concat();


			} else {
				$(".myCart_shop-shop input").prop('checked', false);
				$(".page-footer_left input").prop('checked', false);
				num = 0;
				arr = [];
			};
			myThod();
		})
		// 下面的全选	   
		$(".page-footer_left input").click(function() {
			if (this.checked) {
				num = data.length
				$(".myCart_shop-shop input").prop('checked', true);
				$(".myCart_shop-top input").prop('checked', true);


			} else {
				$(".myCart_shop-shop input").prop('checked', false)
				$(".myCart_shop-top input").prop('checked', false);
				num = 0;
			};
		})

		// 单选

		$(".myCart_shop-shop input").click(function() {
			var index = $(this).index(this);
			console.log(index)
			if (this.checked) {
				num++;

				var ids = $(this).parents("li")[0].dataset.id;
				arr111.push(ids);
				arr.push(data[index]);

			} else {
				num--;
				var del1 = arr.indexOf(data[index]);
				arr.splice(del1, 1);
			};
			if (num == data.length) {
				$(".myCart_shop-top input").prop('checked', true);
				$(".page-footer_left input").prop('checked', true);
			} else {
				$(".myCart_shop-top input").prop('checked', false);
				$(".page-footer_left input").prop('checked', false);
			}


			myThod();
		});

		// 删除按钮
		$(".page-footer_right .delete").click(function() {
			layer.open({
				content: '您确定要删除吗？',
				btn: ['删除', '取消'],
				yes: function(index) {
					// 删除当前含有checked属性的dom
					$(`.page_shop-shops li:has(input:checked)`).remove();
					console.log(arr111)
					$.myAjax({
						url: "/cart/remove",
						type: "post",

						data: {
							ids: arr111
						},
						success: function() {
							layer.open({
								content: '删除成功',
								skin: 'msg',
								time: 2 //2秒后自动关闭
							});
						}
					})
				}
			});


		})

	
	
	
	
		// 编辑与完成下的不同样式
		var is = true;
		$(".page-head span").click(function() {
			if (is == true) {
				$(this).html('完成');

				$("input").prop('checked', false);
				$(".page-footer_center").css('display', 'none');
				$(".page-footer_right").css("display", 'none');
				$(".delete").css('display', 'block');
				is = false;
			} else {
				$(this).html('编辑');

				$("input").prop('checked', true);
				$(".page-footer_center").css('display', 'block');
				$(".page-footer_right").css("display", 'block');
				$(".delete").css('display', 'none');
				is = true;



			}
		});
		
		// 结算点击事件
		$(".page-footer_right").click(function(){
			$.myAjax({
					url:  "/cart/list_ids",
					type:  "post",
					data: {
						ids: arr111
					},
					success: function(){
						var str = arr111.join("-")
						console.log(str)
						window.location.href = `/order/index.html?ids=${str}`
					}
			})
		})
		
	},

});

// 返回箭头
$(".goBack").click(function() {
	history.go(-1);
});

//总价方法
function myThod() {
	var total = 0;

	for (var i = 0; i < arr.length; i++) {
		total += arr[i].price * arr[i].count;

		console.log(total)
	}
	$(".page-price").text("￥" + total + ".00")
}

