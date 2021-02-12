const router=require('express').Router()

const bodyParser=require('body-parser').urlencoded({extended:true})

const authGuard=require('./guards/auth.guard')

const HomeController=require('../controllers/home.controller')

router.get('/',authGuard.isAuht,bodyParser,HomeController.getHome)


module.exports=router