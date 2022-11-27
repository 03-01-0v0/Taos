import {userRepositoryController} from '../databases/repository/UserRepository';
import {accountRepositoryController} from '../databases/repository/AccountRepository';
import {NextFunction, Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import { createError } from '../utils/createError';

const SALT = 10;

class SignUpController {
    // [POST] / sign up
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const {name, password, email, address, phoneNumber} = body.params;
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
                return next(createError(500, 'Cant create user'))
            }
            const hashPassword = bcrypt.hashSync(password, SALT);                             
            const newAccount = await accountRepositoryController.addAccount(
                1,
                newUser.id,
                email,
                hashPassword
            );
            if (!newAccount) {
                return next(createError(500, 'Cant create account'))
            }
            res.status(200).end(JSON.stringify(newAccount));
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new SignUpController();
