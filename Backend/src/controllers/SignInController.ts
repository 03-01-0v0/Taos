import { userRepositoryController } from '../databases/repository/UserRepository';
class SignInController {
    // [POST] / sign-in
    public async index(req, res) {
        res.send('hello');
    }
}

module.exports = new SignInController;