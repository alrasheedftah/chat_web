const UserModel=require('../models/user.model')

/*

* user enter his profile
* Friends
    user1 is in user2 friends

* user1 send request to user2 
    user1 is in user2 friendRequest

* user1 recived request from user2
    user1 is in user2 sendRequest
*/

exports.redirect=(req,res,next)=>{
    res.redirect('/profile/'+req.session.userId)
} 


exports.getProfile=(req,res,next)=>{
 
    let id=req.params.id;
    if(!id) return res.redirect('/profile/'+req.session.userId)

    UserModel.getUserData(id)
    .then(data=>{
       
        res.render('profile',{
            pageTitle:data.username,
            isUser:req.session.userId,
            username:data.username,
            userImage:data.image,
            isOwner:id===req.session.userId,
            isFriends:data.friends.find(friend=>friend.id===req.session.userId),
            isRequestSend:data.friendsRequest.find(friendRequest=> friendRequest.id===req.session.userId),
            isRequestRecived:data.sentRequest.find(sentRequest=>sentRequest.id===req.session.userId),
            myId:req.session.userId,
            myName:req.session.name,
            myImage:req.session.image,
            friendId:data._id,
            friendRequests:req.friendRequests
            
        })
    })

    .catch(err=>{
        console.log(err)
    })


}