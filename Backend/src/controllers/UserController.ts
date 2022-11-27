import {Response, Request, NextFunction} from 'express';
import {userRepositoryController} from '../databases/repository/UserRepository';
import { createError } from '../utils/createError';

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
    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const {
                UserTypeId,
                unitId,
                code,
                name,
                img,
                quantity,
                purchasePrice,
                price,
                shortDescription,
                description,
                isSell,
            } = body.params;
            console.log(name);
            res.status(200).end('success');
        } catch (err) {
            next(err);
        }
    }

    public async updateUser(req, Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();
