
socket.emit("getOnlineFriends",id)

let div=document.getElementById('onlineFriends')
socket.on("onlineFriends",friends=>{
    console.log(friends)

    if(friends.length===0){
        div.innerHTML=`
            <p class="alert alert-danger">No Online Friend </p> 
        `
    }
    else{
        let html=`
            <div class="row"> 
            
        `
        for(let friend of friends){
            html+=`
            <div class="col col-12 col-md-6 col-lg-4 bg-primary">
                <img class="card-img" src="/${friend.image}">
                <div>
                    <h3>
                    <a href="/profile/${friend.id}"> 
                    ${friend.name}
                    </a>
                     </h3>
                    <a href="/chat/${friend.chatId}" class="btn btn-success">Chat </a>
                </div>
            </div>
        
            `
        }
        html+='</div>'
        div.innerHTML=html
    }
})


