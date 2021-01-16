var express = require('express');
var config = require('../config/config');
var router = express.Router();


/* GET users listing. */
router.get('/blood', function(req, res, next) {
  // dispatcher.renderBy()
  res.send('respond with a resource');
});

var dispatcher = {
  renderBy: function (data, res,next) {
    res.render('blood/blood_edit', {id: data.id, serverUrl: db_config.serverUrl + "/addBlood"});
  }
}

var blood = {
  router: router,
  dispatcher: dispatcher,
};

module.exports = blood;
