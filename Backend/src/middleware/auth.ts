import * as jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

const key = process.env.API_KEY;

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            res.status(403).send('Access Denied');
        } else {
            const decoded = jwt.verify(token, key);
            req.app.set('decoded', decoded);
            req.app.set('token', token);
            next();
        }
    } catch (err) {
        next(err);
    }
};

export default verifyToken;
