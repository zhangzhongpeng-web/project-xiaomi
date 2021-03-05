const jwt = require('jsonwebtoken');
const jwtConfig = require('../config').jwtConfig;

module.exports = {
    // 动态生成一个token令牌，并暗藏payload
    _sign: function(payload) {
        return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    },
    generate: function(payload) {
        return 'Bearer ' + this._sign(payload);
    }
};