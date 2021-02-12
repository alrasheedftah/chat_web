const UserModel=require('../models/user.model')

exports.add=(req,res,next)=>{
    // add user1 to user2 friendRequest

    UserModel.sendFriendRequest(req.body)
    .then(()=>{
        res.redirect('/profile/'+req.body.friendId)
    })
    .catch(err=>{
        console.log(err)
        res.redirect('/error')
    })

    // add user2 data to user1 sentRequested
}



exports.cancel=(req,res,next)=>{

    UserModel.cancelFriendRequest(req.body)
    .then(()=>{
        
        res.redirect('/profile/'+req.body.friendId)
    })
    .catch(err=>{
        console.log(err)
        res.redirect('/error')
    })

}


exports.accept=(req,res,next)=>{

    UserModel.acceptFriendRequest(req.body)
    .then(()=>{
        res.redirect('/profile/'+req.body.friendId)
    })
    .catch(err=>{
        res.redirect('/error')
    })

}


exports.delete=(req,res,next)=>{
    UserModel.deleteFriend(req.body)
    .then(()=>{
        res.redirect('/profile/'+req.body.friendId)
    })
    .catch(err=>{
        console.log(err)
        res.redirect('/err')
    })
}


exports.reject=(req,res,next)=>{}

