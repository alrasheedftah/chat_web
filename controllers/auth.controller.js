const authModel=require('../models/auth.model')
const validationResult=require('express-validator').validationResult
exports.getSignup=(req,res,next)=>{
    res.render('signup',{
      validationError:req.flash("validationError"),
      isUser:req.session.userId,
      isAdmin:false,
      pageTitle:'Singup'
    })
}


exports.getLogin=(req,res,next)=>{
    //req.flash("authError")
//    let validationError=req.flash("validationError")
   // console.log(validationError)
    res.render('login',{
        validationLoginError:req.flash("validationError"),
        authError: req.flash("authError")[0],
        isUser:false,
        isAdmin:false,
        pageTitle:'Login'
      
    })
}


exports.postSignup=(req,res,next)=>{
    // return console.log(validationResult(req).array())
    if(validationResult(req).isEmpty()){
    authModel
    .createNewUser(req.body.username,req.body.email,req.body.password)
    .then(()=>{
        res.redirect('/login')
    })
    .catch(err=>{
        req.flash("authError",err)
        res.redirect('/signup')
})
    }else{
        req.flash("validationError",validationResult(req).array())
        res.redirect('/signup')
    }

}

exports.postLogin=(req,res,next)=>{

    if(validationResult(req).isEmpty()){
    authModel
    .login(req.body.email,req.body.password)
    .then(result=>{
        req.session.userId=String(result.id)
        req.session.name=result.username,
        req.session.image=result.image,

        res.redirect("/")
    })
    .catch(err=>{
        req.flash("authError",err)
        res.redirect("/login")
    })
}else{
    req.flash("validationError",validationResult(req).array())
    res.redirect("/login")
}

}


exports.logout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}




