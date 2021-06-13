import mongoose from 'mongoose';
import slugify from 'slugify'

const { Schema } = mongoose
interface Blog {
    title: string,
    content: string,
    description: string,
    slug: string,
    image?: string,
    createdAt: Date

}
const BlogSchema = new Schema<Blog>({
    title: String,
    description: String,
    content: String,
    createdAt: { type: Date, default: Date.now() },
    slug: String,
    image: String
})
BlogSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})
export default mongoose.model<Blog>('Article', BlogSchema)