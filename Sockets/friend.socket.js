const {sendFriendRequest,getFriends}=require('../models/user.model')


module.exports=io=>{
    io.on("connection",socket=>{
    socket.on("sendFriendRequest",data=>{
        // console.log(data+"   id :"+data.friendId)
        // io.to(data.friendId).emit("newFriendRequest",{name:data.myName,id:data.myId})
        sendFriendRequest(data).then(()=>{
            socket.emit("requestSend")
            io.to(data.friendId).emit("newFriendRequest",{name:data.myName,id:data.myId})
        })
        .catch(err=>{
            socket.emit("requestFailed")

        })
     
    })

    socket.on("getOnlineFriends",id=>{
        getFriends(id)
        .then(friends=>{
            let onlineFriends=friends.filter(friend=>io.onlineUsers[friend.id])
          console.log("Online "+onlineFriends)
            socket.emit("onlineFriends",onlineFriends)
        })
        .catch(err=>{
            console.log("error"+err)
        })
    })

})
}