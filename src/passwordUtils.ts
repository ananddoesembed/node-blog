import crypto from 'crypto'

export const genPassword = (password:string) =>{
    const salt = crypto.randomBytes(32).toString('hex')
    const genHash = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')

    return{
        salt:salt,
        hash:genHash
    }
}
export const validatePassword = (password:string,hash:string,salt:string)=>{
    const verify = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')

    return verify === hash

}
