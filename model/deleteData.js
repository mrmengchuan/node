var DBHelper = require('./DBHelper');
var deleteData = {
    deleteName: function (userId, callBack) {
        var sql = "delete from db_user where user_id=" + userId + "";
        DBHelper.query(sql, function (data) {
            var user = data;
            console.log(user)
            callBack(user);
        }, function (err) {
        });
    }

};
module.exports = deleteData;