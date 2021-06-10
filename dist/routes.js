"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const Article_1 = require("./entities/Article");
const router = express_1.Router();
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Articles);
        const posts = yield articleRepo.find();
        res.render('index', { articles: posts });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/new', (_, res) => {
    try {
        res.render('new', { article: new Article_1.Articles() });
    }
    catch (error) {
        console.log(error);
    }
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Articles);
        const article = articleRepo.create(req.body);
        yield articleRepo.save(article);
        res.redirect("/");
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Articles);
        const article = yield articleRepo.findOne(req.params.postId);
        console.log(article);
        res.render('edit', { article: article });
    }
    catch (error) {
        console.log(error);
    }
}));
router.put('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('here');
        const articleRepo = typeorm_1.getRepository(Article_1.Articles);
        const article = yield articleRepo.findOne(req.params.postId);
        if (article == undefined) {
            return res.status(404).send('post not found');
        }
        articleRepo.merge(article, req.body);
        yield articleRepo.save(article);
        res.redirect('/article');
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map