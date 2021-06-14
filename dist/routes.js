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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const Blog_1 = __importDefault(require("./Model/Blog"));
const auth_1 = require("./auth");
const router = express_1.Router();
const storage = multer_1.default.diskStorage({
    destination: './uploads',
    filename: function (_, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = multer_1.default({
    storage: storage,
}).single('image');
router.get('/', auth_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Blog_1.default.find();
        console.log(req.session);
        res.render('index', { articles: posts });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/new', (_, res) => {
    try {
        res.render('new', { article: new Blog_1.default() });
    }
    catch (error) {
        console.log(error);
    }
});
router.post('/', upload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = new Blog_1.default();
        article.title = req.body.title,
            article.description = req.body.description,
            article.content = req.body.content,
            article.image = req.file.filename;
        yield article.save();
        res.redirect("/article");
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield Blog_1.default.findOne({ slug: req.params.slug });
        console.log(article);
        res.render('edit', { article: article });
    }
    catch (error) {
        console.log(error);
    }
}));
router.put('/:slug', upload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.slug);
        const article = yield Blog_1.default.findOne({ slug: req.params.slug });
        if (article == undefined) {
            return res.status(404).send('post not found');
        }
        req.file === undefined ? article.image = 'no' + Date.now() : article.image = req.file.filename;
        yield article.save();
        res.redirect('/article');
    }
    catch (error) {
        console.log(error);
    }
}));
router.delete('/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Blog_1.default.findOneAndDelete({ slug: req.params.slug });
    res.redirect('/article');
}));
exports.default = router;
//# sourceMappingURL=routes.js.map