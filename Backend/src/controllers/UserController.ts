import { Response, Request, NextFunction } from 'express';
import { accountRepositoryController } from '../databases/repository/AccountRepository';
import { userRepositoryController } from '../databases/repository/UserRepository';
import * as bcrypt from 'bcrypt';
import { createError } from '../utils/createError';

const SALT = 10;
class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const listUser = await userRepositoryController.getAllUser();
            if (!listUser) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                data: listUser,
                id: 1,
            });
        } catch (err) {
            next(err);
        }
    }

    public async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const { id } = body;
            const user = await userRepositoryController.getUserById(id);
            res.status(200).json({
                success: true,
                message: 'OK',
                data: user,
            });
        } catch (err) {
            next(err)
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('zoo');

            const body = req.body;
            const { name, password, email, address, phoneNumber } = body.params;
            const user = await userRepositoryController.findUserByEmail(email);
            if (user) {
                return next(createError(419, 'Email exits'));
            }
            const newUser = await userRepositoryController.addUser(
                name,
                email,
                address,
                phoneNumber
            );
            if (!newUser) {
                return next(createError(500, 'Cant create user'));
            }
            const hashPassword = bcrypt.hashSync(password, SALT);
            const newAccount = await accountRepositoryController.addAccount(
                1,
                newUser.id,
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

    public async createUserByAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const { name, email, address, phoneNumber } = body.params;
            const user = await userRepositoryController.findUserByEmail(email);
            if (user) {
                return next(createError(419, 'Email exits'));
            }
            const newUser = await userRepositoryController.addUser(
                name,
                email,
                address,
                phoneNumber
            );
            if (!newUser) {
                return next(createError(500, 'Cant create user'));
            }
            res.status(201).json({
                success: true,
                message: 'CREATED',
                data: newUser,
            });
        } catch (err) {
            next(err);
        }
    }

    public async updateUser(req, Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const { id, name, email, address, phoneNumber } = body;
            const user = await userRepositoryController.updateUserById(
                id,
                name,
                email,
                address,
                phoneNumber
            );
            res.status(200).json({
                success: true,
                message: 'UPDATED',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query;
            const { id } = query;
            const user = await userRepositoryController.removeUser(Number(id));
            res.status(200).json({
                success: true,
                message: 'DELETED',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();
