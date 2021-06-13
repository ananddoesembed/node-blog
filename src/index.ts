import express from 'express'
import 'reflect-metadata'
import router from './routes'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
const server = express()
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true,useUnifiedTopology:true})
server.set('view engine','ejs')
server.use(express.urlencoded({extended:false}))




server.use(methodOverride('_method'))
server.use(express.static("uploads"))
server.get('/',(_,res)=>{
   res.render('login')
})
server.use('/article',router)


 
const port = process.env.PORT || 3000
 server.listen(port,async()=>{
    console.log(`listening to port ${port}`)
   
   
}).on('error',(error:Object)=>console.log(error))

