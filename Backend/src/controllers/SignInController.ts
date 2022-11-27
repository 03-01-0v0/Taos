import {accountRepositoryController} from '../databases/repository/AccountRepository';
import {Response, Request, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {createError} from '../utils/createError';

const API_KEY = process.env.API_KEY;

class SignInController {
    // [POST] Sign in
    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const {name, password} = body.params;
            const account = await accountRepositoryController.getAccountByName(name);
            if (!account) {
                return next(createError(401, 'User name does not exits'));
            }
            const verifyPassword = bcrypt.compareSync(password, account.password);
            if (verifyPassword) {
                const payload = {
                    name: name,
                    authorization: account.authorizationId,
                    password: password,
                    type: 'access',
                };
                const token = jwt.sign(payload, API_KEY, {
                    algorithm: 'HS256',
                    expiresIn: '2 hours',
                });
                account.token = token;
                await accountRepositoryController.saveAccount(account);
                res.status(200).json({
                    success: true,
                    message: 'Authorization success',
                    token: token,
                });
            } else {
                return next(createError(401, 'Authorization false'));
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SignInController();
