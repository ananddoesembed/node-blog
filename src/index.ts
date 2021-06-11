import express from 'express'
import 'reflect-metadata'
import router from './routes'
import { createConnection } from 'typeorm'
import methodOverride from 'method-override'

const server = express()


server.set('view engine','ejs')
server.use(express.urlencoded({extended:false}))
server.use(methodOverride('_method'))
server.use(express.static("uploads"))
server.get('/',(_,res)=>{
   res.redirect('/article')
})
server.use('/article',router)

const port = process.env.PORT || 3000
 server.listen(port,async()=>{
    console.log(`listening to port ${port}`)
   await createConnection().then(()=>console.log('connected')).catch((error)=>console.log(error))
}).on('error',(error:Object)=>console.log(error))