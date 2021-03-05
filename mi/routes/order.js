const Router = require('koa-router');
const router = new Router({ prefix: '/order' });
const { query } = require('../util');

// 删除某一订单
router.get('/remove/:id', async (ctx, next) => {
	const id = ctx.params.id;
	const sql = 'call p_removeOrder(?);';
	const results = await query(sql, [ id ]);
	return Promise.resolve();
});
// 订单确认
router.post('/confirm', async (ctx, next) => {
    const name = ctx.state.jwtPayload.name;
    const { ids, account, addressId } = ctx.request.body;
	const sql = 'CALL p_orderConfirm(?,?,?,?,?);';
	const results = await query(sql, [ ids.join(','), account, new Date(), name, addressId ]);
    return Promise.resolve(results[0][0].orderId);
});

// 获取订单总金额
router.get('/account/:id', async (ctx, next) => {
	const id = ctx.params.id;
	const sql = 'select `account` from `dt_order` where `id` = ?;';
    const results = await query(sql, [ id ]);
    return Promise.resolve(results[0].account);
});

// 为指定的订单付款
router.get('/pay/:id', async (ctx, next) => {
    const id = ctx.params.id;
	const sql = 'update `dt_order` set `pay` = 1 where `id` = ?;';
	const results = await query(sql, [ id ]);
	return Promise.resolve();
});

// 获取当前登录用户所有订单信息
router.get('/list_all', async (ctx, next) => {
    const name = ctx.state.jwtPayload.name;
	const sql = 'select * from `order_product_address` where `uName` = ?;';
    const results = await query(sql, [ name ]);
    return Promise.resolve(resultFormat(results));
});

// 获取当前登录用户所有已付款订单信息
router.get('/list_pay', async (ctx, next) => {
    const name = ctx.state.jwtPayload.name;
	const sql = 'select * from `order_product_address` where `uName` = ? and `pay` = 1;';
	const results = await query(sql, [ name ]);
    return Promise.resolve(resultFormat(results));
});

// 获取当前登录用户所有待付款订单信息
router.get('/list_unpay', async (ctx, next) => {
    const name = ctx.state.jwtPayload.name;
	var sql = 'select * from `order_product_address` where `uName` = ? and `pay` = 0;';
	const results = await query(sql, [ name ]);
    return Promise.resolve(resultFormat(results));
});

// 辅助函数：对结果进行格式化，以便前台使用
function resultFormat(data) {
	var result = [];
	data.forEach(function(item) {
		var i = result.findIndex(function(item2) { return item2.orderId === item.orderId });
		if(i === -1) {
			result.push({
				orderId: item.orderId,
				uName: item.uName,
				account: item.account,
				orderTime: item.orderTime,
				pay: item.pay,
				addressId: item.addressId,
				receiveName: item.receiveName,
				receivePhone: item.receivePhone,
				receiveRegion: item.receiveRegion,
				receiveDetail: item.receiveDetail,
				details: []
			});
		} 
		result[i === -1 ? result.length - 1 : i].details.push({
			id: item.id,
			count: item.count,
			name: item.name,
			remark: item.remark,
			avatar: item.avatar,
			price: item.price
		});
	});
	return result;
}

module.exports = router.routes();