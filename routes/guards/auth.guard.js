exports.isAuht=((req,res,next)=>{
    if(req.session.userId) next()
    else res.redirect('/login')
})

exports.notAuth=((req,res,next)=>{
    console.log("id :"+req.session.userId)
    if(req.session.userId) res.redirect('/')
    else next()
})