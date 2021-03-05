// 返回箭头
$(".adddress-container_head img").on('click', function() {
	window.location.href = "/profile/index.html"
})



$(".button").on('click', function() {
	window.location.href = "index2.html"
})

// 根据登录用户获取地址信息
$.ajax({
	url: "/address/list",
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token")
	},
	success: function(result) {
		if (result.code === 200) {
			if (result.data.length === 0) {
				$(".adddress-container_content_main").css('display', 'block')
			} else {
				$(".adddress-container_content_main").css('display', 'none')

				result.data.forEach(function(item) {
					$(
						`<li style="list-style:none;"data-id="${item.id}">
							<div class="adddess-more">
								<div>
									<span class="spans">姓名:${item.receiveName}</span>
									<span class="spans1">手机号码:${item.receivePhone}</span>
								</div>
								<i style="font-size: 26px;float:right;margin-right:10px;color:#999" class="iconfont icon-edit"></i>
								<div>
									<div class="btn-default">默认</div>
									<p>
										<span>详细地址:${item.receiveRegion}${item.receiveDetail}</span>
										<button class="address-btn" data-isDefault='${item.isDefault}'>默认地址</button>
									</p>
									<i class="iconfont icon-shanchu"></i>
								</div>
							</div>
						</li>
					`
					).appendTo(".adddress-container_content")
				})


				// 删除收货地址
				$(".icon-shanchu").click(function() {
					var id = parseInt($(this).parents("li")[0].dataset.id);
					var that = this;
					//底部对话框
					layer.open({
						content: '确定删除地址信息吗?',
						btn: ['删除', '取消'],
						skin: 'footer',
						yes: function(index) {
							$.ajax({
								url: `/address/remove/${id}`,
								type: "get",
								headers: {
									Authorization: sessionStorage.getItem("token")
								},
								success: function(result) {
									console.log(result)
									if (result.code === 200) {
										layer.open({
											content: '删除成功',
											skin: 'msg',
											time: 2 //2秒后自动关闭
										});

										$(that).parents("li").remove();
									} else {
										layer.open({
											content: '删除失败',
											skin: 'msg',
											time: 2 //2秒后自动关闭
										});
									}
								}

							});
						}
					});

				});


				// 修改收货地址
				$(".icon-edit").click(function() {
					var id = parseInt($(this).parents("li")[0].dataset.id);
					window.location.href = `/profile/adddress/edit/index.html?cid=${id}`


				})

				// 判断谁是默认地址
				$.ajax({
					url: '/address/get_default',
					type: 'get',
					headers: {
						"Authorization": sessionStorage.getItem("token"),
					},
					success: function(result) {
						if (result.code === 200) {
							$(`li[data-id='${result.data.id}']`).find('.btn-default').css('display', 'block')
							$(`li[data-id='${result.data.id}']`).siblings().find('button').text('设为默认地址')
						}
					}

				})

				// 设置默认地址
				$(".adddess-more button").click(function() {
					var id = parseInt($(this).parents("li")[0].dataset.id);
					var this1 = this;
					console.log(this1)
					$.ajax({
						url: `/address/set_default/${id}`,
						type: "get",
						headers: {
							"Authorization": sessionStorage.getItem("token"),
							"Content-Type": "application/json"
						},
						success: function(result) {

							if (result.code === 200) {
								this1.dataset.isDefault = 1;

								layer.open({
									content: '设置成功',
									skin: 'msg',
									time: 2 //2秒后自动关闭
								});
								$(".address-btn").html("设置默认地址");
								$(this1).html("默认地址")
								console.log($(this1).parent())
								$(".btn-default").css("display", "none")
								$(this1).parents("li").find(".btn-default").css("display", "block")

							} else {
								layer.open({
									content: '设置失败',
									skin: 'msg',
									time: 2 //2秒后自动关闭
								});
							}
						}

					})

				})


			};

		}


	}

})
