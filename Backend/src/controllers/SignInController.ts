import {accountRepositoryController} from '../databases/repository/AccountRepository';
import {Response, Request} from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const API_KEY = process.env.API_KEY;

class SignInController {
    // [POST] Sign in
    public async signIn(req: Request, res: Response) {
        try {
            const body = req.body;
            const {name, password} = body.params;
            const account = await accountRepositoryController.getAccountByName(name);
            if (!account) {
                res.status(401).json({
                    success: false,
                    message: 'User name does not exits',
                    id: -1,
                });
            } else {
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
                    res.status(401).json({
                        success: false,
                        message: 'Authorization false',
                        id: -1,
                    });
                }
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
                id: -1,
            });
        }
    }
}

module.exports = new SignInController();
