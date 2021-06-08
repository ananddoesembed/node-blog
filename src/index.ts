import express from 'express'
import 'reflect-metadata'
import router from './routes'

const server = express()

server.set('view engine','ejs')

server.use('/article',router)

const port = process.env.PORT || 3000
server.listen(port,()=>{
    console.log(`listening to port ${port}`)
}).on('error',(error:Object)=>console.log(error))