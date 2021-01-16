/**
 * 血压模块临时表数据添加
 */
var DBHelper = require('./DBHelper');
var JsFunUtil = require("../common/JsFunUtils");

var TableObj = {
    /**
     * 更新综合统一平台的注入反馈结果
     * @param CorrelateID
     * @param CmdResult
     * @param ResultFileURL
     * @param callFun
     */
    updateIntegratedPlatform: function (userID, table, callFun) {
        var sql = "update " + table + " set status=1 WHERE user_id=?";
        var paramArr = [userID];
        var queryParamObj = JsFunUtil.buildFParaObj(TableObj.updateIntegratedPlatform, arguments);
        DBHelper.queryWithParaArr(sql, paramArr, function (results, fields) {
            callFun(results, queryParamObj);
        });
    },
};

module.exports = TableObj;


