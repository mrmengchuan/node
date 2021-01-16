var DBHelper = require('./DBHelper');
var queryData = {
    getName: function (userId, table, callBack) {
        var sql = "select * from " + table + " where user_id=" + userId + " and status=0";
        DBHelper.query(sql, function (data) {
            var user = data;
            console.log(user)
            callBack(user);
        }, function (err) {
        });
    },

    getData: function (userId, table, callBack) {
        var sql = "select * from " + table + " where user_id=" + userId + "";
        DBHelper.query(sql, function (data) {
            var user = data;
            console.log(user)
            callBack(user);
        }, function (err) {
        });
    },

    getAllData: function (callBack) {
        var sql = "select * from t_user_address_draw";
        DBHelper.query(sql, function (data) {
            // var jsonData = [];
            // for (var i = 0; i < data.length; i++) {
            //     var jsonStr = {
            //         "user_id": data[i].user_id,
            //         "user_name": data[i].user_id,
            //         "address": data[i].address,
            //         "user_tel": data[i].user_tel,
            //     }
            //     jsonData.push(jsonStr);
            // }
            // var user = JSON.parse(data);
            // console.log("dataList>>>" + typeof jsonData)
            callBack(data);
        }, function (err) {
        });
    }

};
module.exports = queryData;


