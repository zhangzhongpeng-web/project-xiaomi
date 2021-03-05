module.exports = {
    // 成功
    success: (data = null, msg = '') => ({ code: 200, data, msg }),
    // 逻辑失败
    failure: (data = null, msg = '') => ({ code: 199, data, msg}),
    // 物理失败
    error: (data = null, msg = '') => ({ code: 500, data, msg }),
    // token验证失败
    untoken: (data = null, msg = '') => ({ code: 401, data, msg }),
    // 不存在
    notFound: (data = null, msg = '') => ({ code: 404, data, msg })
};