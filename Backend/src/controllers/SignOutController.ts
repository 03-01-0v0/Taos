import {accountRepositoryController} from '../databases/repository/AccountRepository';
import {Response, Request, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

class SignOutController {
    // [POST] Sign out
    public async signOut(req: Request, res: Response, next: NextFunction) {
        try {
            const decode = req.app.get('decoded');
            const account = await accountRepositoryController.getAccountByName(decode.name);
            account.token = '';
            await accountRepositoryController.saveAccount(account);
            res.status(200).json({
                success: true,
                message: 'OK',
                detail: null
            });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new SignOutController();
