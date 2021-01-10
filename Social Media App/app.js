const express=require('express')
const app=express()
const PORT=5000
const mongoose=require('mongoose')
const {MONGOURI}=require('./Keys')
//const requirelogin=require('./middleware/require_login')


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log('connected')
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/posts'))




app.listen(PORT,()=>{
    console.log("server running at ",PORT)
})