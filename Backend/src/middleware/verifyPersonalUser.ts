import * as jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {createError} from '../utils/createError';

const key = process.env.API_KEY;

interface payload {
    name: string;
    userId: number;
    authorization: number;
    password: string;
    type: string;
    iat: any;
    exp: any;
}

const verifyPersonalUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const body = req.body;
        const {id} = body.params;
        if (!token) {
            res.status(403).send('Access Denied');
        } else {
            const decoded = jwt.verify(token, key) as payload;
            if (decoded.userId != id) {
                return next(createError(401, 'Permission denied'));
            }
            req.app.set('decoded', decoded);
            next();
        }
    } catch (err) {
        next(err);
    }
};

export default verifyPersonalUser;
