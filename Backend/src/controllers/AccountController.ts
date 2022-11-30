import {Response, Request, NextFunction} from 'express';
import {accountRepositoryController} from '../databases/repository/AccountRepository';
import {userRepositoryController} from '../databases/repository/UserRepository';
import {authRepositoryController} from '../databases/repository/AuthorizationRepository';
import * as bcrypt from 'bcrypt';
import {createError} from '../utils/createError';

const SALT = 10;
class AccountController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const listAccount = await accountRepositoryController.getAllAccount();
            if (!listAccount) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                data: listAccount,
                id: 1,
            });
        } catch (err) {
            next(err);
        }
    }

    public async createAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const {authorizationId, userId, email, password} = body.params;
            const user = await userRepositoryController.findUserByEmail(email);
            if (user) {
                return next(createError(419, 'Email exits'));
            }
            const authorization = authRepositoryController.getAuthorizationById(authorizationId);
            if (authorization) {
                return next(createError(419, 'Authorization exits'));
            }
            const hashPassword = bcrypt.hashSync(password, SALT);
            const newAccount = await accountRepositoryController.addAccount(
                authorizationId,
                userId,
                email,
                hashPassword
            );
            if (!newAccount) {
                return next(createError(500, 'Cant create account'));
            }
            res.status(201).json({
                success: true,
                message: 'CREATED',
                data: newAccount,
            });
        } catch (err) {
            next(err);
        }
    }

    public async updateAccount(req, Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const {id, authorizationId, userId, email, password} = body;
            const user = await userRepositoryController.findUserByEmail(email);
            if (user) {
                return next(createError(419, 'Email exits'));
            }
            const authorization = authRepositoryController.getAuthorizationById(authorizationId);
            if (authorization) {
                return next(createError(419, 'Authorization exits'));
            }
            const hashPassword = bcrypt.hashSync(password, SALT);
            const account = await accountRepositoryController.updateAccount(
                id,
                authorizationId,
                userId,
                email,
                hashPassword
            );
            res.status(200).json({
                success: true,
                message: 'UPDATED',
                data: account,
            });
        } catch (err) {
            next(err);
        }
    }

    public async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const {id} = body;
            const account = await accountRepositoryController.removeAccount(id);
            res.status(200).json({
                success: true,
                message: 'DELETED',
                data: account,
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new AccountController();
