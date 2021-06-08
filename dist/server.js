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
const typeorm_1 = require("typeorm");
const db_1 = __importDefault(require("./db"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.connectDB();
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.createConnection(db_1.default).then(() => console.log('connected to db')).catch((error) => console.log(error));
        });
    }
    run(port) {
        return new Promise((resolve, reject) => {
            this.app.listen((port), () => {
                console.log('listening to port');
                resolve(port);
            }).on('error', (error) => reject(error));
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map