var express = require('express');
var pool = require('../pool');
var router = express.Router();

/* GET users listing. */
//用户登录
router.post('/', function(req, res, next) {
  var uname=req.body.params.uname;
  var upwd=req.body.params.upwd;
  if(uname == "" || upwd == ""){
    return;
  }
  var sql = "select * from user where uname=? and upwd=md5(?)";
	pool.query(sql, [uname, upwd], (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			res.send({code:"1",msg:"登录成功"});
		} else {
			res.send({code:"0",msg:"登录失败"});
		}
	});
});
// 用户注册
router.post("/reg", function(req, res, next) {
  var uname=req.body.params.uname;
  var upwd=req.body.params.upwd;
  if(uname == "" || upwd ==""){
    return;
  }
  var sql = "select * from user where uname=? and upwd=?";
  pool.query(sql, [uname, upwd], (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			res.send({code:"0",msg:"此用户名已存在"});
		} else {
      // var obj={uname,upwd};
      var sql = "insert into user (uname,upwd) values (?,md5(?))";
      pool.query(sql, [uname,upwd], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({code:"1",msg:"注册成功"});
        } else {
          res.send({code:"0",msg:"注册失败"});
        }
      });
		}
	});

});
module.exports = router;
