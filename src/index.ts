import express from 'express'
import 'reflect-metadata'
import router from './routes'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

declare module 'express-session' {
   interface SessionData {
      usercount: number;
   }
}
import session from 'express-session'


const server = express()
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: false }))

const sessionStore = new MongoStore({
   ttl: 84 * 60 * 60 * 1000,
   mongoUrl:'mongodb://localhost/blog',
   collectionName: 'session',
   
})

server.use(session({
   secret: 'secret',
   resave: false,
   saveUninitialized: true,
   store: sessionStore,
}));


server.use(methodOverride('_method'))
server.use(express.static("uploads"))
server.get('/', (req, res) => {
   if(!req.session.usercount){
      req.session.usercount=1
   }
   else{
      req.session.usercount+=1
   }
   console.log(req.session.usercount)
   res.render('login')
})
server.use('/article', router)



const port = process.env.PORT || 3000
server.listen(port, async () => {
   console.log(`listening to port ${port}`)


}).on('error', (error: Object) => console.log(error))

