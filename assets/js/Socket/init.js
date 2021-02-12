const socket=io()
const btn=document.getElementById('FriendRequestsDropdown')
let id=$('#userId').val()

socket.on("connect",()=>{
    console.log("connect")

 

    socket.emit("joinNotificationRoom",id)

    socket.emit("goOnline",id)

 
socket.on("newFriendRequest",data=>{
    //const friendRequests=$('#friendRequests')

    const friendRequests=document.getElementById('friendRequests')
    const span=friendRequests.querySelector('span')
    if(span)span.remove()
     friendRequests.innerHTML+=`
        <a class="dropdown-item" href="/profile/${data.id}">
        ${data.name}
    `
    console.log(data)
    // console.log(friendRequests.append('<a href="/profile/'+data.id+'" class="dropdown-item">'+data.name+'</a>'
    // ))
    
    btn.classList.remove('btn-primary')
    btn.classList.add('btn-danger')

})



})
btn.onclick=()=>{
    btn.classList.remove('btn-danger')
    btn.classList.add('btn-btn-primary')

}
