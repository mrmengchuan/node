/**
 * 血压模块临时表数据添加
 */
var DBHelper = require('./DBHelper');
var JsFunUtil = require("../common/JsFunUtils");

var TableObj = {
    /**
     * 添加摄像头领取用户
     * @param user 用户id
     * @param callFun
     */
    insertOrderLogInfo: function (user,table,callFun) {
        var sql = "insert into " + table + "(user_id,user_name,address,user_tel,insert_dt,status)" +
            " values(?,?,?,?,now(),0);";
        console.log(sql);
        var paramArr = [user.user_id, user.user_name,user.address,user.user_tel];
        var queryParamObj = JsFunUtil.buildFParaObj(TableObj.insertOrderLogInfo, arguments);
        DBHelper.queryWithParaArr(sql, paramArr, function (results, fields) {
            callFun(results, queryParamObj);
        });
    },

    /**
     * 添加血压用户
     * @param user 用户id
     * @param callFun
     */
    insertBloodUserInfo: function (user, table,callFun) {
        var sql = "insert into " + table + "(user_id,user_name,card_id,user_tel,insert_dt)" +
            " values(?,?,?,?,now());";
        console.log(sql);
        var paramArr = [user.user_id, user.user_name, user.card_id,user.user_tel];
        var queryParamObj = JsFunUtil.buildFParaObj(TableObj.insertOrderLogInfo, arguments);
        DBHelper.queryWithParaArr(sql, paramArr, function (results, fields) {
            callFun(results, queryParamObj);
        });
    }

};

module.exports = TableObj;