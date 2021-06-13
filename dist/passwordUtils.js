"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.genPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const genPassword = (password) => {
    const salt = crypto_1.default.randomBytes(32).toString('hex');
    const genHash = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: genHash
    };
};
exports.genPassword = genPassword;
const validatePassword = (password, hash, salt) => {
    const verify = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return verify === hash;
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=passwordUtils.js.map