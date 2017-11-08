function norenzheng(req, res, next) {
  
        if(res.session.user){
          res.locals.username= req.session.user.name
           }else{
             next()
           }
      }
module.exports=norenzheng;
