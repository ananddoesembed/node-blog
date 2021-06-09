import { ConnectionOptions } from "typeorm";


export const connection:ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "blog",
    synchronize:true,
    entities:[
        'dist/models/**/*.js'
    ],
    migrations:[
        'dist/migrations/**/*.js'
    ],
    cli:{
        migrationsDir:"src/migrations"
    }
    
}
export default connection