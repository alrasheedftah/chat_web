const mongoose=require('mongoose')

const DB_URL="mongodb://localhost:27017/chat-app"


const ChatSchema=mongoose.Schema({
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]
})


const Chat=mongoose.model('chat',ChatSchema)

exports.Chat=Chat

exports.getFriendData=async chatId=>{

    try { 
        await mongoose.connect(DB_URL)
        
        let chat= await Chat.findById(chatId).populate({
        path:'users', //field in Collection
        model:'user',
        select:'username image'
 
    })
    // console.log(chat)
    mongoose.disconnect()
    return chat

    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }


}

