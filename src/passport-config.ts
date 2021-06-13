import passport from 'passport'
import passportLocal, { VerifyFunction } from 'passport-local'
import User from './Model/User'
import {validatePassword} from './passwordUtils'

const LocalStrategy = passportLocal.Strategy;

//here am using email to autheticate instead of username
const verifyCallback:VerifyFunction = (email:string,password:string,done:Function)=>{
User.findOne({email}).then((user)=>{
    if(!user){
        return done(null,false)
    }
    const isValid = validatePassword(password,user.hash,user.salt)
    if(!isValid){
        return done(null,false)
    }
    else{
        return done(null,user)
    }
}).catch((err)=>{
    done(err)
})
}


const strategy = new LocalStrategy({usernameField:"email"},verifyCallback)

passport.use(strategy)


passport.serializeUser<any, any>((_, user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user)=>
    done(null, user)).catch((err)=>done(err))
});

