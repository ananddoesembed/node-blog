import mongoose from 'mongoose';

const { Schema } = mongoose
interface User {
    salt: string,
    hash: string,
    email:string,
    createdAt: Date

}
const UserSchema = new Schema<User>({
    salt: String,
    hash: String,
    email: String,
    createdAt: { type: Date, default: Date.now() },
})

export default mongoose.model<User>('User',UserSchema)