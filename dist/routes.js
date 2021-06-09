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
const Article_1 = require("./models/Article");
const router = express_1.Router();
router.get('/', (req, res) => {
    const posts = [{
            title: 'A1',
            createdAt: new Date,
            description: "B1",
            paragraph: "adfadfdsff"
        }, {
            title: 'C1',
            createdAt: new Date,
            description: "B2",
            paragraph: "adfadfdsff"
        }, {
            title: 'A2',
            description: "B3",
            createdAt: new Date,
            paragraph: "adfadfdsff"
        }];
    console.log(req.body);
    res.render('index', { articles: posts });
});
router.get('/new', (_, res) => {
    res.render('new');
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articleRepo = typeorm_1.getRepository(Article_1.Articles);
    const article = yield articleRepo.create(req.body);
    const result = yield articleRepo.save(article);
    res.send(result);
}));
exports.default = router;
//# sourceMappingURL=routes.js.map