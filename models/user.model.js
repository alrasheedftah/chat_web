const mongoose=require('mongoose')
const DB_URL="mongodb://localhost:27017/chat-app"
const Chat=require('./chat.model').Chat
const userScheema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    image:{
        type:String,defualt:'profile.jpg'
    },

    isOnline:{type:Boolean,defualt:false},

    friends:{
        type:[{name:String,image:String,id:String,chatId:String}],
        defualt:[]
    },

    friendsRequest:{
        type:[{name:String,id:String}],
        defualt:[]
    },

    sentRequest:{
        type:[{name:String,id:String}],
        defualt:[]
    }
})

const User=mongoose.model("user",userScheema)

exports.User=User



exports.getUserData=id=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL)
        .then(()=>{
            return User.findById(id)
        })
        .then(data=>{
            mongoose.disconnect()
            resolve(data)
        })

        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}



exports.sendFriendRequest=async (data)=>{
      // add user1 to user2 friendRequest
    // add user2 data to user1 sentRequested
try{

    console.log(data)
    await mongoose.connect(DB_URL)
    await User.updateOne({_id:data.friendId},{$push:{friendsRequest:{name:data.myName,id:String(data.myId)}}})
    await User.updateOne({_id:data.myId},{$push:{sentRequest:{name:data.friendName,id:String(data.friendId)}}})

    mongoose.disconnect()

    return
}catch(error){
mongoose.disconnect()
console.log(error)
throw new Error(error)
}

}

exports.cancelFriendRequest= async(data)=>{

    // remove me from friend Requests

    // remove user2 from my send requeste
    try{
    await mongoose.connect(DB_URL)
    await User.updateOne({_id:data.friendId},{$pull:{friendsRequest:{id:data.myId}}})
    await User.updateOne({_id:data.myId},{$pull:{sentRequest:{id:data.friendId}}})
    mongoose.disconnect()
    }catch(err){
        mongoose.disconnect()
        throw new Error(err)
    }

}


exports.acceptFriendRequest=async(data)=>{

    // remove me from friendRequest 
    // remove me from my sendrequest 
    // add me to friends 

    try{
        await mongoose.connect(DB_URL)
        await User.updateOne({_id:data.friendId},{$pull:{friendsRequest:{id:data.myId}}})
        await User.updateOne({_id:data.myId},{$pull:{sentRequest:{id:data.friendId}}})

        let newChat=new Chat({
            users:[data.myId,data.friendId]
        })
        let chatDoc=await newChat.save()

        await User.updateOne({_id:data.myId},{
            $push:
            {
                friends:{
                    name:data.friendName,
                    id:data.friendId,
                    image:data.friendImage,
                    chatId:chatDoc._id
                }
            }
        })
        await User.updateOne({_id:data.friendId},{
            $push:{
                friends:{
                    name:data.myName,
                    id:data.myId,
                    image:data.myImage,
                    chatId:chatDoc._id
                }
            }
        })
        mongoose.disconnect()
        


    }catch(err){
        mongoose.disconnect()
        throw new Error(err)
    }


}

exports.rejectFriendRequest=()=>{}

exports.deleteFriend=async(data)=>{

    // delete user2 from my friends

    // delete me from user2 friends 

    

    try {
        
        await mongoose.connect(DB_URL)
        await User.updateOne({_id:data.myId},{$pull:{friends:{id:data.friendId}}})
        await User.updateOne({_id:data.friendId},{$pull:{friends:{id:data.myId}}})
        mongoose.disconnect()

    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}


exports.getFriendRequests=async id =>{
    try{
        await mongoose.connect(DB_URL)
        let data=await User.findById(id,{friendsRequest:true})
        return data.friendsRequest
    }catch(err){
        throw new Error(err)
    }
}


exports.getFriends=async id=>{

    try{
    await mongoose.connect(DB_URL)
    let data=await User.findById(id,{friends:true})
    mongoose.disconnect()
    return data.friends
    }catch(error){
        throw new Error(error)
    }

}