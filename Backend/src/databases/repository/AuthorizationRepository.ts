import {Repository} from 'typeorm';
import {Authorization} from '../entity/Authorization';
import {appDataSource} from '../data-source';

class AuthorizationRepository {
    private _authRepository: Repository<Authorization>;

    constructor() {
        this._authRepository = appDataSource.getRepository(Authorization);
    }

    public async getAllAuthorization(): Promise<Authorization[]> {
        return this._authRepository.find();
    }

    public async getAuthorizationById(id: number): Promise<Authorization> {
        return this._authRepository.findOneBy({id});
    }

    public async addAuthorization(permissions: string): Promise<Authorization> {
        const authorization = new Authorization();
        authorization.permissions = permissions;
        return this._authRepository.save(authorization);
    }

    public async updateAuthorization(id: number, permissions: string): Promise<Authorization> {
        const authorization = await this._authRepository.findOneBy({id});
        if (!authorization) {
            throw new Error(`Cant find authorization with id: ${id}`);
        }
        authorization.permissions = permissions;
        return this.saveAccount(authorization);
    }

    public async removeAuthorization(id: number): Promise<Authorization> {
        const authorization = await this._authRepository.findOneBy({id});
        if (!authorization) {
            throw new Error(`Cant find authorization with id: ${id}`);
        }
        return this._authRepository.remove(authorization);
    }

    public async saveAccount(authorization: Authorization): Promise<Authorization> {
        if (authorization) {
            return this._authRepository.save(authorization);
        }
        return null;
    }
}

export const authRepositoryController = new AuthorizationRepository();
