const mongoose=require('mongoose')
const DB_URL="mongodb://localhost:27017/chat-app"
const Chat=require('./chat.model').Chat


const MessagesScheema=mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
    content:String,
    sender:String,
    timestamp:Number
})

const Messages=mongoose.model('message',MessagesScheema)

exports.getMessages=async chatId=>{

    try { 
        await mongoose.connect(DB_URL)
        
        let messages= await Messages.find({chat:chatId}).populate({
        path:'chat', //field in Collection
        model:'chat',
        populate:{
            path:'users',
            model:'user',
            select:'username image'
        }

    })
    console.log(messages)
    mongoose.disconnect()
    return messages

    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }


}



exports.saveMessage=async messages=>{
    try {
        await mongoose.connect(DB_URL)
        let newMessage=new Messages(messages)
        // console.log("newMessage.chat   : "+newMessage.chat)
        newMessage.timestamp=Date.now()
        await newMessage.save()
        mongoose.disconnect()
        return
    } catch (error) {
        
        mongoose.disconnect()
        throw new Error(error)
    }
}