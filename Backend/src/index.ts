import {appDataSource} from './databases/data-source';
import {Express} from 'express';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import handleError from './middleware/handleError';
import * as path from 'path';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as multer from 'multer';

/* CONFIGURATIONS */
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/assets',express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload = multer({storage});

const route = require('./routes');
const port = process.env.PORT;

appDataSource
.initialize()
.then(async () => {
    console.log('Init DB successfully');
    //Route init
    route(app);
    // Handle Error request
    app.use(handleError);
    // store img
    //
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://127.0.0.1/:${port}`);
    });
    // });
})
.catch((error) => console.log(error));