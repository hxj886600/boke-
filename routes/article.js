var express = require('express');
var authorise=require("../common/authorise");
var noren=require("../common/noren");
var Article=require("../model/Article");
var router = express.Router();

/* GET users listing. */
router.use(authorise);
router.get('/',function(req, res, next) {
  Article.find(function(err,data){
    
    res.render('article/index',{articles:data,username:req.session.user.name});
  })
  
});

router.get('/publish', function(req, res, next) {

  
  res.render("article/publish",{username:req.session.user.name});
});
  
router.get('/update/:id',function(req, res, next) {
  Article.find({_id:req.params.id},function(err,article){
    if(err) return handleError(err);
    res.render("article/update",{article:article[0],username:req.session.user.name});
  })

});

  
router.post('/update', function(req, res, next) {

  let={title,author,content,id}=req.body;

  Article.update({_id:id},{title,author,content},function(err){
    if(err) return console.error(err);
    res.redirect("/article/");
  });


  Article.find({_id:req.params.id},function(err,article){
    if(err) return handleError(err);
    res.render("article/update",{article:article[0],username:req.session.user.name});
  })
});

router.post('/publish', function(req, res, next) {
  let {title,author,content}=req.body;
        var article=new Article({
          title:title,
          author:author,
          content:content,
        });
        article.save(function(err,data){
          if(err){
            res.redirect("/article/publish");
          } else{
            res.redirect("/article/");
          }         
        });

});
router.post('/dele',function(req, res, next){
var dele=req.body.dele
dele.trim()
console.log(dele)
  Article.remove({_id:dele},function(err){
    if(err){
      res.json({status:-1})
    }else{
      res.json({status:1})

    }

  })
})
module.exports = router;
