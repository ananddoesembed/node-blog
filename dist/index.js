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
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const routes_1 = __importDefault(require("./routes"));
const method_override_1 = __importDefault(require("method-override"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const server = express_1.default();
mongoose_1.default.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });
server.set('view engine', 'ejs');
server.use(express_1.default.urlencoded({ extended: false }));
const sessionStore = new connect_mongo_1.default({
    ttl: 84 * 60 * 60 * 1000,
    mongoUrl: 'mongodb://localhost/blog',
    collectionName: 'session',
});
server.use(express_session_1.default({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
}));
server.use(method_override_1.default('_method'));
server.use(express_1.default.static("uploads"));
server.get('/', (req, res) => {
    if (!req.session.usercount) {
        req.session.usercount = 1;
    }
    else {
        req.session.usercount += 1;
    }
    console.log(req.session.usercount);
    res.render('login');
});
server.use('/article', routes_1.default);
const port = process.env.PORT || 3000;
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`listening to port ${port}`);
})).on('error', (error) => console.log(error));
//# sourceMappingURL=index.js.map