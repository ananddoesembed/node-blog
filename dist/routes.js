"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (_, res) => {
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
    res.render('index', { articles: posts });
});
router.get('/new', (_, res) => {
    res.send('high');
});
exports.default = router;
//# sourceMappingURL=routes.js.map