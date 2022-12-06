import 'reflect-metadata';
import {DataSource} from 'typeorm';

export const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'Ta012345',
    database: 'Taos',
    synchronize: true,
    logging: false,
    entities: ['src/databases/entity/*.ts'],
    migrations: [],
    subscribers: [],
});
