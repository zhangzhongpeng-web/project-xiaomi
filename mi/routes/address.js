const Router = require('koa-router');
const router = new Router({ prefix: '/address' });
const { query } = require('../util');

// 获取当前登录用户的所有相关地址信息
router.get('/list', async (ctx, next) => {
    const name = ctx.state.jwtPayload.name;
    const sql = 'select * from `dt_address` where `name` = ?;';
    const results = await query(sql, [ name ]);
    return Promise.resolve(results);
});

// 根据某个地址的id获取地址的详细信息
router.get('/model/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id);
	const sql ='select * from `dt_address` where `id` = ?;';
    const results = await query(sql, [ id ]);
    return Promise.resolve(results[0]);
});

// 新增一个地址
router.post('/add', async (ctx, next) => {
    const name = ctx.state.jwtPayload.name;
	const { receiveName, receivePhone, receiveRegion, receiveDetail } = ctx.request.body;
	const sql = 'insert `dt_address`(`name`,`receiveName`,`receivePhone`,`receiveRegion`,`receiveDetail`) values(?,?,?,?,?);';
    const results = await query(sql, [ name, receiveName, receivePhone, receiveRegion, receiveDetail ]);
    if(results.affectedRows === 1)
        return Promise.resolve(results.insertId);
    else
        return Promise.reject('地址新增失败..');
});

// 修改一个地址
router.post('/update', async (ctx, next) => {
    const { id, receiveName, receivePhone, receiveRegion, receiveDetail } = ctx.request.body;
	const sql = 'update `dt_address` set `receiveName`=?,`receivePhone`=?,`receiveRegion`=?,`receiveDetail`=? where `id`=?;';
    const results = await query(sql, [ receiveName, receivePhone, receiveRegion, receiveDetail, id ]);
    if(results.affectedRows === 1)
        return Promise.resolve();
    else
        return Promise.reject('地址修改失败..');
});

// 删除一个地址
router.get('/remove/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id);
    const sql = 'call p_removeAddress(?);';
    const results = await query(sql, [ id ]);
    if(results[0][0].result === '')
        return Promise.resolve();
    else 
        return Promise.reject(results[0][0].result);
});

// 设置某个地址为默认地址
router.get('/set_default/:id', async (ctx, next) => {
    const name = ctx.state.jwtPayload.name;
	const id = parseInt(ctx.params.id);
	const sql = 'call p_setDefaultAddress(?, ?);';
    const results = await query(sql, [ id, name ]);
    return Promise.resolve();
});

// 获取某个用户的默认地址
router.get('/get_default', async (ctx, next) => {
    const name = ctx.state.jwtPayload.name;
    const sql ='select * from `dt_address` where `name` = ? and `isDefault` = 1;';
    const results = await query(sql, [ name ]);
    return Promise.resolve(results[0]);
});

module.exports = router.routes();