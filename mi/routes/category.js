const Router = require('koa-router');
const router = new Router({ prefix: '/category' });
const query = require('../util').query;

router.get('/all', async (ctx, next) => {
    const sql = 'select * from `dt_category`;';
    const results = await query(sql, []);
    return Promise.resolve(results);
});

router.get('/list/:fid', async (ctx, next) => {
    const fid = parseInt(ctx.params.fid);
    const sql = 'select * from `dt_category` where `fid` = ?;';
    const results = await query(sql, [ fid ]);
    return Promise.resolve(results);
});

module.exports = router.routes();