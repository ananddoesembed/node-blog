"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const User_1 = __importDefault(require("./Model/User"));
const passwordUtils_1 = require("./passwordUtils");
const LocalStrategy = passport_local_1.default.Strategy;
const verifyCallback = (email, password, done) => {
    User_1.default.findOne({ email }).then((user) => {
        if (!user) {
            return done(null, false);
        }
        const isValid = passwordUtils_1.validatePassword(password, user.hash, user.salt);
        if (!isValid) {
            return done(null, false);
        }
        else {
            return done(null, user);
        }
    }).catch((err) => {
        done(err);
    });
};
const strategy = new LocalStrategy({ usernameField: "email" }, verifyCallback);
passport_1.default.use(strategy);
passport_1.default.serializeUser((_, user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => {
    User_1.default.findById(id).then((user) => done(null, user)).catch((err) => done(err));
});
//# sourceMappingURL=passport-config.js.map