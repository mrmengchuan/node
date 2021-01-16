var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataApi = require("../model/queryData");
var addDataApi = require("../model/addData");
var deleteDataApi = require("../model/deleteData");
var updateDataApi = require("../model/update");
var urlencode = require('urlencode');
const bodyParser = require("body-parser");
var config = require('../config/config');
var blood = require('./blood.js');
var qr = require('qr-image')
var app = express();
if (config.RELEASE) {
    db_config = config.CONFIG;
} else {
    db_config = config.BEBUG_CONFIG;
}

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


router.get(`/qrCode`, (req, res, next) = > {
    var text = req.query.text;
try {
    var img = qr.image(text, {size: 12});
    res.writeHead(200, {'Content-Type': 'image/png'});
    img.pipe(res);
} catch (e) {
    res.writeHead(414, {'Content-Type': 'text/html'});
    res.end('<h1>414 Request-URI Too Large</h1>');
}
})

router.get(`/queryData`, (req, res, next) => {
    var decodeData = Buffer.from(req.query.data, 'base64').toString('ascii');
    var dataJson = JSON.parse(decodeData);
    switch (dataJson.router) {
        case "blood":
            dataApi.getName(dataJson.user_id, config.TABLE.blood_user, function (data) {
                res.send({"result": 0, "msg": "数据查询成功", "list": data});
                if (data.length > 0) {
                    updateDataApi.updateIntegratedPlatform(dataJson.user_id, config.TABLE.blood_user, function () {
                        console.log("更新成功");
                    })
                }
            });
            break;
        default:
            dataApi.getName(dataJson.user_id, config.TABLE.address_user, function (data) {
                res.send({"result": 0, "msg": "数据查询成功", "list": data});
                if (data.length > 0) {
                    updateDataApi.updateIntegratedPlatform(dataJson.user_id, config.TABLE.address_user, function () {
                        console.log("更新成功");
                    })
                }
            });
            break
    }
})

router.get(`/addData`, (req, res, next) => {
    dataApi.getData(req.query.user_id, config.TABLE.address_user, function (data) {
        if (data.length > 0) {
            res.send({"status": 2, "msg": "你已添加过信息"});
            console.log("重复添加")
            return;
        } else {
            console.log(req.query)
            var userInfo = {
                "user_id": req.query.user_id,
                "user_name": req.query.user_name,
                "address": req.query.address,
                "user_tel": req.query.user_tel,
            }
            addDataApi.insertOrderLogInfo(userInfo, config.TABLE.address_user, function () {
                console.log({status: 1, msg: "数据添加成功"})
            })
            res.send({"status": 1, "msg": "数据添加成功"});
        }
    });


})


router.get(`/addBlood`, (req, res, next) => {
    dataApi.getData(req.query.user_id, config.TABLE.blood_user, function (data) {
        // if (data.length > 0) {
        //     res.send({"status": 2, "msg": "你已添加过信息"});
        //     console.log("重复添加")
        //     return;
        // } else {
            console.log(req.query)
            var userInfo = {
                "user_id": req.query.user_id,
                "user_name": req.query.user_name,
                "card_id": req.query.card_id,
                "user_tel": req.query.user_tel,
            }
            addDataApi.insertBloodUserInfo(userInfo, config.TABLE.blood_user, function () {
                console.log({status: 1, msg: "数据添加成功"})
            })
            res.send({"status": 1, "msg": "数据添加成功"});
        // }
    });


})


router.get(`/index`, (req, res, next) => {
    try {
        var decodeData = Buffer.from(req.query.data, 'base64').toString('ascii');
        var data = JSON.parse(decodeData);
    } catch (e) {
        data={"router":"","id":""};
    }
    switch (data.router) {
        case "blood":
            blood.dispatcher.renderBy(data, res)
            console.log(req.query.id)
            break;
        default:
            res.render('index', {id:req.query,serverUrl: db_config.serverUrl + "/addData"});
            // console.log(data.id)
            break
    }

})

router.get(`/userList`, (req, res, next) => {
    dataApi.getAllData(function (data) {
        if (data.length > 0) {
            res.render('user_list', {dataList: JSON.stringify(data)});
        } else {
            res.render('user_list', {dataList: "链接失败"});
        }
    })

})


module.exports = router;
