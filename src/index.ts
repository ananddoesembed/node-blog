import express from 'express'
import 'reflect-metadata'
import router from './routes'
import db from './db'
import { createConnection } from 'typeorm'
const server = express()

server.set('view engine','ejs')
server.use(express.urlencoded({extended:false}))
server.use('/',router)
const port = process.env.PORT || 3000
 server.listen(port,async()=>{
    console.log(`listening to port ${port}`)
   await createConnection(db).then(()=>console.log('connected')).catch((error)=>console.log(error))
}).on('error',(error:Object)=>console.log(error))