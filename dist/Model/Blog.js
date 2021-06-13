"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const { Schema } = mongoose_1.default;
const BlogSchema = new Schema({
    title: String,
    description: String,
    content: String,
    createdAt: { type: Date, default: Date.now() },
    slug: String,
    image: String
});
BlogSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify_1.default(this.title, { lower: true, strict: true });
    }
    next();
});
exports.default = mongoose_1.default.model('Article', BlogSchema);
//# sourceMappingURL=Blog.js.map