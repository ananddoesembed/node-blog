import { Router } from 'express'
import { getRepository } from 'typeorm'
import { Articles } from './entities/Article'

const router = Router()
router.get('/', async (_, res) => {
    try {
        const articleRepo = getRepository(Articles)
        const posts = await articleRepo.find()
        res.render('index', { articles: posts })

    } catch (error) {
        console.log(error)
    }
})
router.get('/new', (_, res) => {
    try {
        res.render('new', { article: new Articles() })
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req, res) => {
    try {
        const articleRepo = getRepository(Articles)
        const article = articleRepo.create(req.body)
        await articleRepo.save(article)
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})
router.get('/:postId', async (req, res) => {
    try {
        const articleRepo = getRepository(Articles)
        const article = await articleRepo.findOne(req.params.postId)
        console.log(article)
        res.render('edit', { article: article })
    } catch (error) {
        console.log(error)
    }

})
router.put('/:postId', async (req, res) => {
    try {
        console.log('here')
        const articleRepo = getRepository(Articles)
        const article = await articleRepo.findOne(req.params.postId)
        if(article==undefined)
        {
            return res.status(404).send('post not found')
        }
        articleRepo.merge(article, req.body)
        await articleRepo.save(article)
        res.redirect('/article')
    } catch (error) {
        console.log(error)
    }
})
export default router;