const mysql = require('mysql');
const dbConfig = require('../config').dbConfig;

function query(sql, params) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(dbConfig);
        connection.query(sql, params, (error, results, fields) => {
            connection.end();
            if(error) reject(error);    // 出错返回一个携带error对象的promise
            else resolve(results);      // 成功返回一个携带结果的对象的promise
        });
    });
}

module.exports = query;
