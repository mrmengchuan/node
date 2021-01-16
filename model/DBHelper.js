/**
 * 数据库管理工具
 */
var LogUtils = require("../common/log");
var mysql = require('mysql');
var config = require('../config/config');

var db_config = "";
if (config.RELEASE) {
	db_config = config.CONFIG;
} else {
	db_config = config.BEBUG_CONFIG;
}
var pool = createPool();
var dbError = createDBOptError();

/**
 * 创建mysql连接池
 * @returns {Pool}
 */
function createPool() {

    var pool = mysql.createPool({
        host: db_config.host,
        port: db_config.port,
        user: db_config.user,
        password: db_config.password,
        database: db_config.db_name,
        charset: "utf8",
        connectionLimit: 8
    });
    return pool;
}

/**
 * 创建操作数据库失败信息
 */
function createDBOptError() {
    return {
        FAILED_CONNECT_DB: {code: -101, msg: "数据库连接失败"},
        FAILED_EXEC_SQL: {code: -102, msg: "执行SQL失败，无结果返回！"},
    };
}

module.exports = {
    db: pool,   // 返回db对象
    db_error: dbError, // 返回db操作失败信息对象

    /**
     * 执行sql语句，一般用于没有变量传递形式,调用者只需要处理成功的回调，失败的统一在此处处理
     * @param sql
     * @param callback args[results, fields]
     * @param failCallback args[error_code, error_msg, error_detail_reason_msg]
     */
    query: function (sql, callback, failCallback) {
        pool.getConnection(function (err, conn) {
            if (err) {  // not connected!
                LogUtils.info("DBHelper err:" + err.toString());
                if (typeof failCallback === "function") {
                    var optErr = dbError.FAILED_CONNECT_DB;
                    failCallback(optErr.code, optErr.msg, err.toString());
                }
                return;
            }
            conn.query(sql, function (error, results, fields) {
                conn.release(); //When done with the connection, release it.
                if (error) {
                    LogUtils.info("DBHelper error:" + error.toString());
                    if (typeof failCallback === "function") {
                        var optErr = dbError.FAILED_EXEC_SQL;
                        failCallback(optErr.code, optErr.msg, error.toString());
                    }
                    return;
                }
                callback(results, fields);

            });

        });
    },

    /**
     * 执行sql语句，一般用于过滤用户输入字符串使用s
     * @param sql
     * @param paraArr
     * @param callback
     */
    queryWithParaArr: function (sql, paraArr, callback, failCallback) {
        pool.getConnection(function (err, conn) {
            if (err) { // not connected!
                LogUtils.info("DBHelper err:" + err.toString());
                if (typeof failCallback === "function") {
                    var optErr = dbError.FAILED_CONNECT_DB;
                    failCallback(optErr.code, optErr.msg, err.toString());
                }
                return;
            }
            conn.query(sql, paraArr, function (error, results, fields) {
                conn.release(); //When done with the connection, release it.
                if (error) {
                    LogUtils.info("DBHelper error:" + error.toString());
                    if (typeof failCallback === "function") {
                        var optErr = dbError.FAILED_EXEC_SQL;
                        failCallback(optErr.code, optErr.msg, error.toString());
                    }
                    return;
                }
                callback(results, fields);
            });

        });
    },
    /**
     * 批量执行sql语句
     * @param db
     * @param sql
     * @param pramaters
     * @param callback
     */
    queryBatch: function (sql, paraArr, callback) {
        pool.getConnection(function (err, conn) {
            if (err) { // not connected!
                LogUtils.info("DBHelper err:" + err.toString());
                return;
            }

            conn.query(sql, [paraArr], function (error, results, fields) {
                conn.release(); //When done with the connection, release it.
                if (error) {
                    LogUtils.info("DBHelper error:" + error.toString());
                    callback(error, results);
                    return;
                }
                callback(error, results);
            });
        });
    }
};
