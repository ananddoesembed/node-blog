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
router.get('/:slug', async (req, res) => {
    try {
        const articleRepo = getRepository(Articles)
        const article = await articleRepo.findOne({ slug: req.params.slug })
        console.log(article)
        res.render('edit', { article: article })
    } catch (error) {
        console.log(error)
    }

})
router.put('/:slug', async (req, res) => {
    try {
        const articleRepo = getRepository(Articles)
        const article = await articleRepo.findOne({ slug: req.params.slug })
        if (article == undefined) {
            return res.status(404).send('post not found')
        }
        articleRepo.merge(article, req.body)
        await articleRepo.save(article)
        res.redirect('/article')
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:slug', async (req, res) => {
    const articleRepo = getRepository(Articles)
    await articleRepo.delete({ slug: req.params.slug })
    res.redirect('/article')
})
export default router;