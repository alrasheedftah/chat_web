
const express=require('express')
const path=require('path')
const SocketIO=require('socket.io')

// import session 
const session=require('express-session')
const SessionStore=require('connect-mongodb-session')(session)

// flash session 
const flash=require('connect-flash')
///


// use my routers

// const homeRouter=require('./routes/home.route')
// const productRouter=require('./routes/product.route')
const authRouter=require('./routes/auth.route')
const profileRouter=require('./routes/profile.route')
const friendRouter=require('./routes/friend.route')
const homeRouter=require('./routes/home.route')
const chatRouter=require('./routes/chat.route')
// const cartRouter=require('./routes/cart.route')
// const orderRouter=require('./routes/order.router')
// const adminRouter=require('./routes/admin.route')
const app=express()

const server=require('http').createServer(app)

const io=SocketIO(server)


// define arra to hold online users
 io.onlineUsers={} // or  const onlineUsers={} then  and passed to socket 

require('./Sockets/friend.socket')(io)
require('./Sockets/init.socket')(io)
require('./Sockets/chat.socket')(io)


app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))

/// use flash session ass middelware
app.use(flash())
//

// use check validatore as middleware

//

// make store session 
const STORE=new SessionStore({
    url:"mongodb://localhost:27017/chat-app",
    databaseName:'chat-app',
    collection:'sessions'
})

STORE.on('error', function(error) {
    console.log(error);
  });
   

///  use Stor Session 

app.use(session({
    secret:"this is my secrecet key ",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
    ,
    clear_interval: 3600,
    store:STORE
    
}))



app.set('view engine','ejs')
app.set('views','views') //defualt


const getFreienRequest=require('./models/user.model').getFriendRequests
app.use((req,res,next)=>{
    if(req.session.userId)
    {
        getFreienRequest(req.session.userId)
        .then((requests)=>{
            req.friendRequests=requests
            next()
        })

        .catch(err=>{
            res.redirect('/error')
        })

    }else{
        next()
    }
})



app.use('/',homeRouter)
app.use('/',authRouter)
app.use('/profile',profileRouter)
app.use('/friend',friendRouter)
app.use('/chat',chatRouter)

// app.get('/product',(res,req,next)=>{
//     req.render('test',{});
// })
// app.use('/cart',cartRouter)
// app.use('/order',orderRouter)
// app.use('/admin',adminRouter)
app.get('/error',(req,res,next)=>{
    res.render('error',{
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin,
        pageTitle:'Error',
        friendRequests:[]
    })
})

app.use((error,req,res,next)=>{
    res.status(500)
    console.log("error "+error)
    res.redirect('/error')
})


server.listen(3000,()=>{
    console.log("connecting with serve on port 3000 ")
})















// const express=require('express')

// const path=require('path')

// const app=express()

// const server=require('http').createServer(app)

// const io=require('socket.io')(server)


// io.on('connection',(socket)=>{
//     console.log("new User Connected ")

//     socket.on("sendmsg",()=>{

//         io.to("myRoom").emit('newmsg')

//     })

//     socket.on("joinRoom",()=>{

//         socket.join("myRoom")
//     })

// })

// app.get('/',(req,res,next)=>{

//     res.sendFile(path.join(__dirname,'index.html'))

// })



// server.listen(3000,()=>{
//     console.log("Server Listen on Port 3000")
// })