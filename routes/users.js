var express = require('express');
var User=require("../model/user");
var authorise=require("../common/authorise");
var router = express.Router();
/* GET article listing. */
router.get('/',authorise,function(req, res, next) {
  res.render('users/index',{title:'Express',username:req.session.user.name});
});
router.get('/logup',function(req, res, next) {
  res.render('users/logup');
});
router.get('/login',function(req, res, next) {
  res.render('users/login');
});
router.post('/login',function(req, res, next) {
  var {txtUserName,txtUserPwd}=req.body;
  
 User.find({name:txtUserName,pwd:txtUserPwd},function(err,data){
    if(err){
      res.json({status:-1,msg:"登录失败"});
    } else{
      if(data.length==0){
        res.json({status:-1,msg:"用户不存在"});
      }else{
        req.session.user=data[0];
        res.json({status:1,msg:"登录成功"});
      }
      
    }
 });

});
//退出判断页面
router.post("/logout",function(req,res,next){
  req.session.destroy(function(err){
    if(err) res.json({state:-1});
            res.json({state:1});
  });
})

//注册页面
router.post('/logup',function(req, res, next) {

    var {txtUserName,txtUserPwd}=req.body;
     
    User.find({name:txtUserName},function(err,data){
      if(data.length==0){
          var user=new User({
            name:txtUserName,
            pwd:txtUserPwd
          });

          user.save(function(err,data){
            if(err){
              res.json({status:-1,msg:"注册失败"});
            } else{
              res.json({status:1,msg:"注册成功"});
            }
            
          });

        }else{
          res.json({status:-1,msg:"用户名已存在"});
        }
      
    });
})


module.exports = router;
