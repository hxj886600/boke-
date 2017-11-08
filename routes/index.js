var express = require('express');
var Article=require("../model/Article");
var router = express.Router();
var noren=require("../common/noren");
/* GET home page. */
router.get('/',function(req, res, next) {

  Article.find(function(err,data){
    var username=req.session.user?req.session.user.name:"";
    res.render('index',{title:'Express',articles:data ,username:username});
  })
});
router.get('/articledetail',function(req, res, next) {
  Article.find(function(err,data){
    res.render('articledetail',{title:'Express',articles:data});
  })
});
  
router.get('/articledetail/:id', function(req, res, next) {


  Article.find({_id:req.params.id},function(err,article){
    if(err) return handleError(err);
    res.render("articledetail",{article:article[0]});
  })

  
});  



router.get('/session',function(req, res, next) {
  if(req.session.views==undefined){
    req.session.views=0;
  }else{
    req.session.views++;
  }
  res.send(req.session.views.toString());
  res.end();
});
  


module.exports = router;
