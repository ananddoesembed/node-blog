"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).redirect('/');
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=auth.js.map