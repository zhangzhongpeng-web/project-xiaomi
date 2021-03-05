const Router = require('koa-router');
const router = new Router({ prefix: '/user' });
const { query, tokenHelper } = require('../util');

// 手机登录
router.post('/login_phone', async (ctx, next) => {
    return Promise.reject('暂未开通手机登录功能，请选择账号密码登录..');
});

// 账号密码登录
router.post('/login_pwd', async (ctx, next) => {
    const { name, pwd } = ctx.request.body;
    const sql = 'select count(*) as count from `dt_user` where `name` = ? and `pwd` = ?;';
    const results = await query(sql, [ name, pwd ]);
    if(results[0].count)
        return Promise.resolve(tokenHelper.generate({ name }));
    else 
        return Promise.reject('账号或密码错误..');
});

// 验证用户名是否已存在
router.get('/check_name/:name', async (ctx, next) => {
    const name = ctx.params.name;
    const sql = 'select count(*) as count from `dt_user` where `name` = ?;';
    const results = await query(sql, [ name ]);
    return Promise.resolve(results[0].count);
});

// 验证手机号是否已存在
router.get('/check_phone/:phone', async (ctx, next) => {
    const phone = ctx.params.phone;
    const sql = 'select count(*) as count from `dt_user` where `phone` = ?;';
    const results = await query(sql, [ phone ]);
    return Promise.resolve(results[0].count);
});

// 账号注册
router.post('/register', async (ctx, next) => {
    const { name, pwd, phone } = ctx.request.body;
    const sql = 'call p_register(?,?,?);';
    const results = await query(sql, [ name, pwd, phone ]);
    if(results[0][0].result === '')
        return Promise.resolve();
    else
        return Promise.reject(results[0][0].result);
});

module.exports = router.routes();