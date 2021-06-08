import { ConnectionOptions } from "typeorm";

export const connection:ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "blog"
}
export default connection