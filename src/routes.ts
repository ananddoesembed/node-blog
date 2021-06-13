import { Router } from 'express'
import path from 'path'
import multer from 'multer'
import Article from './Model/Blog'
const router = Router()

const storage = multer.diskStorage({
    destination:'./uploads',
    filename:function(_,file,cb){
       cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
 })
 
 const  upload = multer({
    storage:storage,
 }).single('image')


router.get('/',async (_, res) => {
    try {
        const posts = await Article.find()

        res.render('index', { articles: posts })

    } catch (error) {
        console.log(error)
    }
})
router.get('/new', (_, res) => {
    try {
        res.render('new', { article: new Article() })
    } catch (error) {
        console.log(error)
    }
})
router.post('/',upload,async (req, res) => {
    try {
        const article = new Article()
           article.title=req.body.title,
           article.description=req.body.description,
           article.content=req.body.content,
           article.image=req.file.filename
        await article.save()
        res.redirect("/article")
    } catch (error) {
        console.log(error)
    }
})
router.get('/:slug', async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug })
        console.log(article)
        res.render('edit', { article: article })
    } catch (error) {
        console.log(error)
    }

})

router.put('/:slug', upload,async (req, res) => {
    try {

        console.log(req.params.slug)
        const article = await Article.findOne({ slug: req.params.slug })
        if (article == undefined) {
            return res.status(404).send('post not found')
        }
        req.file===undefined?article.image='no'+Date.now():article.image=req.file.filename
        await article.save()
        res.redirect('/article')
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:slug', async (req, res) => {
    await Article.findOneAndDelete({ slug: req.params.slug })
    res.redirect('/article')
})
export default router;