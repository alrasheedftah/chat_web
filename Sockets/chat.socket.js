const saveMessage=require('../models/messages.model').saveMessage

module.exports=io=>{
    io.on("connection",socket=>{
        socket.on('joinChat',chatId=>{
            socket.join(chatId)
        })
 
        socket.on("sendMessage",(data,cb)=>{
            // console.log("messsage "+data.chat)
            saveMessage(data).then(()=>{
                io.to(data.chat).emit("newMessage",data)
                cb()
            })
        })
    })
}