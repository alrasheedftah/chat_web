const router=require('express').Router()

const bodyParser=require('body-parser').urlencoded({extended:true})

const authGuard=require('./guards/auth.guard')

const FriendController=require('../controllers/friend.controller')

router.post('/add',authGuard.isAuht,bodyParser,FriendController.add)

router.post('/cancel',authGuard.isAuht,bodyParser,FriendController.cancel)

router.post('/accept',authGuard.isAuht,bodyParser,FriendController.accept)

router.post('/delete',authGuard.isAuht,bodyParser,FriendController.delete)

// router.post('/reject',authGuard,bodyParser,FriendController.reject)





module.exports=router