"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repo = void 0;
const typeorm_1 = require("typeorm");
const Session_1 = require("./entities/Session");
const repo = () => {
    const repository = typeorm_1.getConnection().getRepository(Session_1.Session);
    return repository;
};
exports.repo = repo;
//# sourceMappingURL=sessetionInit.js.map