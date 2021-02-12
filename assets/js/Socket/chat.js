let chatId=document.getElementById('chatId').value
socket.emit('joinChat',chatId)

const msgText=document.getElementById('message')
let sendBtn=document.getElementById('sendBtn')
const messageContainer=document.getElementById('messages-container')
sendBtn.onclick=()=>{
    let content=msgText.value
    socket.emit('sendMessage',{
        chat:chatId,
        content:content,
        sender:id
    },()=>{
        msgText.value='' 
    })

}

socket.on("newMessage",msg=>{
    messageContainer.innerHTML+=msg.content
    console.log(msg)
   // msgText.value='' but can use other way by pass callback that enable excute after event executed
})
