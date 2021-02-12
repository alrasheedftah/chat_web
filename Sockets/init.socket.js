
module.exports=io=>{
    io.on("connection",socket=>{
    socket.on("joinNotificationRoom",id=>{
        socket.join(id)
        console.log("User Joined "+id)
    
     
    })

    socket.on("goOnline",id=>{
        io.onlineUsers[id]=true
        //console.log(" OnlineUsers :"+io.onlineUsers[id])
        socket.on("disconnect",()=>{
            io.onlineUsers[id]=false
            //console.log("  OFFnlineUsers :"+io.onlineUsers[id])

        })
    })

})

}