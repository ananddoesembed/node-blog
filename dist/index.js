"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const routes_1 = __importDefault(require("./routes"));
const server = express_1.default();
server.set('view engine', 'ejs');
server.use('/article', routes_1.default);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`listening to port ${port}`);
}).on('error', (error) => console.log(error));
//# sourceMappingURL=index.js.map