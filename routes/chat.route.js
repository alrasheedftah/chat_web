const router=require('express').Router()

const bodyParser=require('body-parser').urlencoded({extended:true})

const authGuard=require('./guards/auth.guard')

const ChatController=require('../controllers/chat.controller')

router.get('/:id',authGuard.isAuht,bodyParser,ChatController.getChat)


module.exports=router
