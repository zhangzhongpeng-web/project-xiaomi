const Router = require('koa-router');
const router = new Router({ prefix: '/product' });
const query = require('../util').query;

// 后台管理系统分页获取数据可以用
// router.post('/list', async (ctx, next) => {
//     const { name, cid, orderCol, orderDir, begin, pageSize } = ctx.request.body;
//     const sql = "call p_getProduct2(?,?,?,?,?,?);";
//     const results = await query(sql, [ name, cid, orderCol, orderDir, begin, pageSize ]);
//     return Promise.resolve({ total: results[0][0].total, list: results[1] });
// });
router.post('/list', async (ctx, next) => {
    const { name, cid, orderCol, orderDir, begin, pageSize } = ctx.request.body;
    const sql = "call p_getProduct(?,?,?,?,?,?);";
    const results = await query(sql, [ name, cid, orderCol, orderDir, begin, pageSize ]);
    return Promise.resolve(results[0]);
});

router.get('/model/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id);
    const sql = "select * from `dt_product` where `id` = ?;";
    const results = await query(sql, [ id ]);
    return Promise.resolve(results[0]);
});

module.exports = router.routes();