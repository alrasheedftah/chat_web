// const socket=io()
const addbtn=$('#addButton')
const myId=$('#userId').val()
const myName=$('#myName').val()
const myImage=$('#myImage').val()
const friendId=$('#friendId').val()
const friendImage=$('#friendImage').val()
const friendName=$('#friendName').val()


addbtn.on('click',(e)=>{
    e.preventDefault()
    socket.emit("sendFriendRequest",{
        myId,
        myName,
        myImage,
        friendId,
        friendName,
        friendImage
        
    })
})


socket.on('requestSend',()=>{
    addbtn.remove()
    document.getElementById('friends-form').innerHTML+=`
    <input type="submit" value="Cancel Request" class="btn btn-danger" formaction="/friend/cancel"> 
    `
})