const Chat=require('../models/chat.model')

const Messages=require('../models/messages.model')


exports.getChat=(req,res,next)=>{
    let chatId=req.params.id
    
    // console.log("id   "+chatId)
    Messages.getMessages(chatId).then(messages=>{
        if(messages.length===0){
            Chat.getFriendData(chatId).then(chat=>{
              let  friendData=chat.users.find(
                    user=>user._id!=req.session.userId
                )
                res.render('chat',{
                    pageTitle:friendData.username,
                    isUser:req.session.userId,
                    friendRequests:req.friendRequests,
                    messages:messages,
                    friendData:friendData,
                    chatId:chatId
        
                })
            })
            
        }else{
         friendData=messages[0].chat.users.find(
            user=>user._id!=req.session.userId )
        
        //console.log("frData is "+friendData)

            
        res.render('chat',{
            pageTitle:friendData.username,
            isUser:req.session.userId,
            friendRequests:req.friendRequests,
            messages:messages,
            friendData:friendData,
            chatId:chatId

        })
    }
    })
}