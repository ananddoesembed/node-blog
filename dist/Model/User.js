"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    salt: String,
    hash: String,
    email: String,
    createdAt: { type: Date, default: Date.now() },
});
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map