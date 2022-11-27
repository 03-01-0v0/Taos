import {accountRepositoryController} from '../databases/repository/AccountRepository';
import {Response, Request, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const API_KEY = process.env.API_KEY;

class SignOutController {
    // [POST] Sign out
    public async signOut(req: Request, res: Response, next: NextFunction) {
        try {
            const decode = req.app.get('decoded');
            res.status(200).end('success');
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new SignOutController();
