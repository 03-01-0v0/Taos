import {Repository} from 'typeorm';
import {Account} from '../entity/Account';
import {Authorization} from '../entity/Authorization';
import {User} from '../entity/User';
import {appDataSource} from '../data-source';

class AccountRepository {
    private _accountRepository: Repository<Account>;
    private _authRepository: Repository<Authorization>;
    private _userRepository: Repository<User>;

    constructor() {
        this._accountRepository = appDataSource.getRepository(Account);
        this._authRepository = appDataSource.getRepository(Authorization);
        this._userRepository = appDataSource.getRepository(User);
    }

    public setAccount(
        authorizationId: number,
        userId: number,
        name: string,
        password: string,
        img: string,
        account: Account
    ): Account {
        account.authorizationId = authorizationId;
        account.userId = userId;
        account.name = name;
        account.password = password;
        account.img = img;
        return account;
    }

    public async getAllAccount(): Promise<Account[]> {
        return this._accountRepository
            .createQueryBuilder('account')
            .leftJoinAndSelect(
                Authorization,
                'authorization',
                'account.authorizationId = authorization.id'
            )
            .getMany();
    }

    public async getAccountById(id: number): Promise<Account> {
        return this._accountRepository.findOneBy({id});
    }

    public async getAccountByName(name: string): Promise<Account> {
        return this._accountRepository.findOneBy({name});
    }

    public async addAccount(
        authorizationId: number,
        userId: number,
        name: string,
        password: string,
        img: string = ''
    ): Promise<Account> {
        const auth: Authorization = await this._authRepository.findOneBy({id: authorizationId});
        if (!auth) {
            throw new Error(`Cant find authorization with id: ${authorizationId}`);
        }
        const user: User = await this._userRepository.findOneBy({id: userId});
        if (!user) {
            throw new Error(`Cant find user with id: ${userId}`);
        }
        const account = new Account();
        this.setAccount(authorizationId, userId, name, password, img, account);

        return this._accountRepository.save(account);
    }

    public async updateAccount(
        id: number,
        authorizationId: number,
        userId: number,
        name: string,
        password: string,
        img: string
    ): Promise<Account> {
        const account = await this._accountRepository.findOneBy({id});
        if (!account) {
            throw new Error(`Cant find account with id: ${id}`);
        }
        const user: User = await this._userRepository.findOneBy({id: userId});
        if (!user) {
            throw new Error(`Cant find user with id: ${userId}`);
        }
        this.setAccount(authorizationId, userId, name, password, img, account);
        return this.saveAccount(account);
    }

    public async removeAccount(id: number): Promise<Account> {
        const account = await this._accountRepository.findOneBy({id});
        if (!account) {
            throw new Error(`Cant find account with id: ${id}`);
        }
        return this._accountRepository.remove(account);
    }

    public async saveAccount(account: Account): Promise<Account> {
        if (account) {
            return this._accountRepository.save(account);
        }
        return null;
    }
}

export const accountRepositoryController = new AccountRepository();
