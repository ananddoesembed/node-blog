"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
exports.connection = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "blog",
    synchronize: true,
    entities: [
        'dist/models/**/*.js'
    ],
    migrations: [
        'dist/migrations/**/*.js'
    ],
    cli: {
        migrationsDir: "src/migrations"
    }
};
exports.default = exports.connection;
//# sourceMappingURL=db.js.map