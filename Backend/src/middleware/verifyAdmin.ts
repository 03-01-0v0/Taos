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

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const token = await req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            res.status(403).send('Access Denied');
        } else {
            const decoded = await jwt.verify(token, key) as payload;
            if (decoded.authorization != 2) {
                return next(createError(401, 'Permission denied'));
            }
            req.app.set('decoded', decoded);            
            next();
        }
    } catch (err) {
        next(err);
    }
};

export default verifyAdmin;
