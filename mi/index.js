// 导入第三方
const path = require('path');
const Koa = require('koa');
const cors = require('koa2-cors');
const favicon = require('koa-favicon');
const static = require('koa-static');
const body = require('koa-body');
const jwt = require('koa-jwt');
// 导入自定义
const jwtConfig = require('./config').jwtConfig;
const routerMiddleWares  = require('./routes');
const { httpResult, tokenHelper } = require('./util');

const app = new Koa();
// 输出客户端请求url,便于观察所有客户端请求
app.use(async (ctx, next) => { console.log(ctx.url); await next(); });
// 让服务器支持客户端的跨域请求
app.use(cors());
// 处于favicon请求
app.use(favicon(__dirname + '/public/favicon.ico'));
// 让koa将客户端所有的静态资源请求映射到指定的目录中去
app.use(static(__dirname + '/public'));
// 对于请求体中带参数的情况进行处理
app.use(body({
    multipart: true,
    formidable: {
        keepExtensions: true,
        uploadDir: path.join(__dirname, "public/tmp")
    },
    onError: (error, ctx) => { console.log(error); }
}));
// 统一返回的中间件
app.use(async (ctx, next) => {
    return next()
        .then((data = null) => {
            // token验证通过（更新token,重新计算token过期时间）
            if(ctx.state.jwtPayload) {
                ctx.res.setHeader('Authorization', tokenHelper.generate({ name: ctx.state.jwtPayload.name }));
            }
            ctx.body = httpResult.success(data);
        })
        .catch(error => {
            if(error.status && error.status === 401)
                ctx.body = httpResult.untoken(null, '未登录或登录超时，请重新登录');
            else if(typeof error !== 'string')
                ctx.body = httpResult.error(null, error.message);
            else if(error === '404')
                ctx.body = httpResult.notFound();
            else
                ctx.body = httpResult.failure(null, error);
        });
});
// token验证，分类、商品、及用户相关的操作无需登录直接放行
app.use(jwt({ secret: jwtConfig.secret, key: 'jwtPayload' }).unless({ path: [ /^\/category/, /^\/product/, /^\/user/ ] }));
// 自定义动态路由数据操作请求
routerMiddleWares.forEach(router => app.use(router));
// 能到这里说明404,返回一个失败的promise，收尾的好去catch到，再统一返回
app.use(async (ctx, next) => Promise.reject('404'));
// 开始监听
app.listen(3000, () => console.log("The server is running at port 3000.."));

// koa框架 坑点：
// await next() 或者 next()都可调用下一个中间件，但下一个中间件如果有异步耗时的代码，则一定要用await next();
// 否则koa主线程不会等，会得到not Found或404
