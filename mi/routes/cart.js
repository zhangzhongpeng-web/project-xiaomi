const Router = require('koa-router');
const router = new Router({ prefix: '/cart' });
const { query } = require('../util');

// 获取当前登录用户的购物车中的所有信息
router.post('/list', async (ctx, next) => {
	const name = ctx.state.jwtPayload.name;
	const sql = 'select T1.id,T1.pid,T1.count,T2.name,T2.avatar,T2.price,T2.brief from (select * from `dt_cart` where `name` = ?) T1 inner join `dt_product` T2 on T1.pid = T2.id;';
	const results = await query(sql, [ name ]);
	return Promise.resolve(results);
});

// 获取指定购物id的相关信息
router.post('/list_ids', async (ctx, next) => {
	const { ids } = ctx.request.body;
	var sql = 'select T1.id,T1.pid,T1.count,T2.name,T2.avatar,T2.price,T2.brief from (select * from `dt_cart` where `id` in (?)) T1 inner join `dt_product` T2 on T1.pid = T2.id;';
	const results = await query(sql, [ ids ]);
	return Promise.resolve(results);
});

// 向购物车中添加商品
router.post('/add', async (ctx, next) => {
	const name = ctx.state.jwtPayload.name;
	const { pid, count } = ctx.request.body;
	const results = await query('call p_addProductToCart(?,?,?);', [ name, pid, count ]);
	if(results[0][0].result === '') 
		return Promise.resolve();
	else 
		return Promise.reject(results[0][0].result);
});
// 删除购物记录
router.post('/remove', async (ctx, next) => {
	const { ids } = ctx.request.body;
	const sql = 'delete from `dt_cart` where `id` in (?);';
	const results  = await query(sql, [ ids ]);
	if(results.affectedRows === ids.length) 
		return Promise.resolve();
	else 
		return Promise.reject('从购物车中删除商品失败..');
});
// 增加数量
router.post('/increase/:id', async (ctx, next) => {
	const id = parseInt(ctx.params.id);
	const sql = 'update `dt_cart` set `count` = `count` + 1 where `id` = ?;';
	const results = await query(sql, [ id ]);
	if(results.affectedRows === 1) 
		return Promise.resolve();
	else 
		return Promise.reject('数量增加失败..');
});
// 减少数量
router.post('/decrease/:id', async (ctx, next) => {
	const id = parseInt(ctx.params.id);
	const sql = 'update `dt_cart` set `count` = `count` - 1 where `id` = ?;';
	const results = await query(sql, [ id ]);
	if(results.affectedRows === 1) 
		return Promise.resolve();
	else 
		return Promise.reject('数量增加失败..');
});
// 获取当前登录用户购物车中所有购物记录的总数量
router.get('/total', async (ctx, next) => {
	const name = ctx.state.jwtPayload.name;
	const sql = 'select sum(`count`) as total from `dt_cart` where `name` = ?;';
	const results = await query(sql, [ name ]);
	return Promise.resolve(results[0].total || 0);
});


module.exports = router.routes();