import 'reflect-metadata';
import {DataSource} from 'typeorm';

export const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Ta01234',
    database: 'Taos',
    synchronize: true,
    logging: false,
    entities: ["src/databases/entity/*.ts"],
    migrations: [],
    subscribers: [],
});
