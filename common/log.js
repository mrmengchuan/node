var fs = require("fs");
var moment = require("moment");
var config = require("../config/config");

module.exports = {
    write: function (title_str, args_str) {
        var logPath = __dirname + config.LogDir + moment().format('YYYY-MM-DD') + '.txt';
        fs.appendFile(logPath, moment().format('YYYY-MM-DD HH:mm:ss') + " " + title_str + ": " + args_str + "\r\n", 'utf8', function (err) {
            if (err) console.log(err);
        });
    },
    info: function (logStr) {
        var logPath = __dirname + config.LogDir + moment().format('YYYY-MM-DD') + '.txt';
        fs.appendFile(logPath, moment().format('YYYY-MM-DD HH:mm:ss') + " " + logStr + "\r\n", 'utf8', function (err) {
            if (err) console.log(err);
        });
    },
    writeIP: function (reqIP) {
        var logPath = __dirname + config.LogDir + "access" + moment().format('YYYY-MM-DD') + '.txt';
        fs.appendFile(logPath, moment().format('YYYY-MM-DD HH:mm:ss') + " " + reqIP + "\r\n", 'utf8', function (err) {
            if (err) console.log(err);
        });
    }
};
