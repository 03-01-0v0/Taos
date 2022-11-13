import {Repository} from 'typeorm';
import {Account} from '../entity/Account';
import {appDataSource} from '../data-source';

class AccountRepository {
    private _accountRepository: Repository<Account>;

    constructor() {
        this._accountRepository = appDataSource.getRepository(Account);
    }

    public setAccount(
        authorizationId: number,
        userId: number,
        name: string,
        password: string,
        account: Account
    ): Account {
        account.authorizationId = authorizationId;
        account.userId = userId;
        account.name = name;
        account.password = password;
        return account;
    }

    public async getAllAccount(): Promise<Account[]> {
        return this._accountRepository.find();
    }

    public async getAccountById(id: number): Promise<Account> {
        return this._accountRepository.findOneBy({id});
    }

    public async addAccount(
        authorizationId: number,
        userId: number,
        name: string,
        password: string
    ): Promise<Account> {
        const account = new Account();
        this.setAccount(authorizationId, userId, name, password, account);
        return this._accountRepository.save(account);
    }

    public async updateAccount(
        id: number,
        authorizationId: number,
        userId: number,
        name: string,
        password: string
    ): Promise<Account> {
        const account = await this._accountRepository.findOneBy({id});
        if (!account) {
            throw new Error(`Cant find account with id: ${id}`);
        }
        this.setAccount(authorizationId, userId, name, password, account);
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
