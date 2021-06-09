import {Router} from 'express'
import { getRepository} from 'typeorm'
import { Articles } from './models/Article'

const router = Router()
// rou/ter.use(express.json())
router.get('/',(req,res)=>{
    const posts = [{
        title:'A1',
        createdAt:new Date,
        description:"B1",
        paragraph:"adfadfdsff"
    },{
        title:'C1',
        createdAt:new Date,
        description:"B2",
        paragraph:"adfadfdsff"
    },{
        title:'A2',
        description:"B3",
        createdAt:new Date,
        paragraph:"adfadfdsff"
    }]
    console.log(req.body)
    res.render('index',{articles:posts})
    })
    
    router.get('/new',(_,res)=>{
        res.render('new')
        })
    router.post('/',async(req,res)=>{
            const articleRepo = getRepository(Articles)
            const article = await articleRepo.create(req.body)
            const result = await articleRepo.save(article)
            res.send(result)
     })
            
export default router;