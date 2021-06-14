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
import passport from 'passport'
import { genPassword } from './passwordUtils'
import User from './Model/User'


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
require('./passport-config')
server.use(passport.initialize());
server.use(passport.session());
server.get('/',async(req, res) => {
   req.logOut()
   res.render('login')
})
server.post('/login',passport.authenticate('local',{failureRedirect:'/',successRedirect:'/article'}))
server.use('/article', router)

server.post('/register',async(req,res)=>{
   const saltHash= genPassword(req.body.password)
   
   const salt = saltHash.salt
   const hash = saltHash.hash
   const newUser = new User({
      hash:hash,
      salt:salt,
      email:req.body.email
   })
   await newUser.save()
   res.send(newUser)
})

const port = process.env.PORT || 3000
server.listen(port, async () => {
   console.log(`listening to port ${port}`)


}).on('error', (error: Object) => console.log(error))

