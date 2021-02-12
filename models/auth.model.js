const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const DB_URL="mongodb://localhost:27017/chat-app"


const User=require('./user.model').User;

exports.createNewUser=(username,email,password)=>{

    // check if email exits
    // yes ===> error 
    // no ====>  create new account

    return new Promise((resolve,reject)=>{
        
        mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return User.findOne({email:email})
        })
        .then(user=>{
            if(user){
                mongoose.disconnect()
                reject("email is used")}
            else{
                return bcrypt.hash(password,10)
            }
        })
        .then(hashedPassword=>{
            let user=new User({
                username:username,
                email:email,
                password:hashedPassword

            })
           return user.save() 
        })
        .then(()=>{
            mongoose.disconnect()
            resolve()
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)})
    })
}


    exports.login=(email,password)=>{



        // yes  ==>  set cookies  isuser,true

       return new Promise((resolve,reject)=>{
           mongoose.connect(DB_URL)
           .then(()=>{
              return User.findOne({ email: email })
           })
           .then(user=>{
               //console.log(" all users"+user)
               if(!user){
                   mongoose.disconnect()

                   reject(" There is No User Matched This E-mail "+email)
               }
               else{
                    bcrypt.compare(password,user.password)
                    .then((same)=>{
                        if(!same){
                            mongoose.disconnect()
                            reject("Password Invalid ")
                        }
                        else{
                         mongoose.disconnect()
                         resolve(user)
                        }
                    })
               }
           })
           .catch(err=>{
               mongoose.disconnect()
               reject(err)
           })

       })
    }


    exports.getEmail=id=>{
        return new Promise((resolve,reject)=>{
            
        })
    }