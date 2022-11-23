import {appDataSource} from './databases/data-source';
import {Express} from 'express';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const route = require('./routes');
const port = process.env.PORT;

appDataSource
    .initialize()
    .then(async () => {
        // console.log('Here you can setup and run express / fastify / any other framework.');
        app.use(cors());
        app.use(bodyParser.json());
        console.log('Init DB successfully');
        //Route init
        route(app);
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://127.0.0.1/:${port}`);
        });
        // });
    })
    .catch((error) => console.log(error));

