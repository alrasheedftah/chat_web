const router=require('express').Router()
const bodyParser=require('body-parser')

const profileController=require('../controllers/profile.controller');

const authGuard=require('./guards/auth.guard')

// validation check
const check=require('express-validator').check
//

router.get('/',authGuard.isAuht,profileController.redirect)

router.get('/:id',authGuard.isAuht,profileController.getProfile)

module.exports=router