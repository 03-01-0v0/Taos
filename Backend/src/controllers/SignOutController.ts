import {accountRepositoryController} from '../databases/repository/AccountRepository';
import {Response, Request} from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const API_KEY = process.env.API_KEY;

class SignOutController {
    // [POST] Sign out
    public async signOut(req: Request, res: Response) {
        try {
            const decode = req.app.get('decoded');
            res.status(200).end('success');
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
                id: -1,
            });
        }
    }
}

module.exports = new SignOutController();
