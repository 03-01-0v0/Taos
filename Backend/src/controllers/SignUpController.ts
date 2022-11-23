import {userRepositoryController} from '../databases/repository/UserRepository';
import {accountRepositoryController} from '../databases/repository/AccountRepository';
import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt';

const SALT = 10;

class SignUpController {
    // [POST] / sign up
    public async signUp(req: Request, res: Response) {
        try {
            const body = req.body;
            const {name, password, email, address, phoneNumber} = body.params;
            const user = await userRepositoryController.findUserByEmail(email);            
            if (user) {
                res.status(419).end('Email exits');
            } else {
                const newUser = await userRepositoryController.addUser(
                    name,
                    email,
                    address,
                    phoneNumber
                );                
                if (!newUser) {
                    res.status(500).end();
                    return;
                }
                const hashPassword = bcrypt.hashSync(password, SALT);                             
                const newAccount = await accountRepositoryController.addAccount(
                    1,
                    newUser.id,
                    email,
                    hashPassword
                );
                if (!newAccount) {
                    res.status(500).end();
                } else {
                    res.status(200).end(JSON.stringify(newAccount));
                }
            }
        } catch (err) {
            res.status(500).end(err);
        }
    }
}

module.exports = new SignUpController();
