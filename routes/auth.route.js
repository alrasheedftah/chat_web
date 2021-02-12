const router=require('express').Router()
const bodyParser=require('body-parser')

const authController=require('../controllers/auth.controller');

const authGuard=require('./guards/auth.guard')

// validation check
const check=require('express-validator').check
//


router.get('/signup',authGuard.notAuth,authController.getSignup)

router.post('/signup', authGuard.notAuth,
bodyParser.urlencoded({extended : true}),
check('username').not().isEmpty().withMessage("UserName Required "),
check('email').not().isEmpty().withMessage("E-mail Is Required ").isEmail().withMessage(" Invalid Format E-mail "),
check('password').isLength({min : 6}).withMessage("Password Is Required Or Min 6 char"),
check('confirmPassword').custom((value,{req})=>{
    if(value === req.body.password) return true;
    else throw " No Matched Password "
}),
authController.postSignup)

router.get('/login',authGuard.notAuth,authController.getLogin)

router.post('/login',authGuard.notAuth,
bodyParser.urlencoded({extended:true}),
check("email").notEmpty().withMessage("E-mail Required").isEmail().withMessage("Invalid Format E-mail "),
check("password").notEmpty().isLength({min :6 }).withMessage(" Password Must be Min 6 Charecture ")
,authController.postLogin)

router.all('/logout',authGuard.isAuht,authController.logout)


module.exports=router