import {Repository} from 'typeorm';
import {WarehouseExport} from '../entity/WarehouseExport';
import {Account} from '../entity/Account';
import {User} from '../entity/User';
import {appDataSource} from '../data-source';

class WarehouseExportRepository {
    private _warehouseExportRepository: Repository<WarehouseExport>;
    private _accountRepository: Repository<Account>;
    private _userRepository: Repository<User>;

    constructor() {
        this._warehouseExportRepository = appDataSource.getRepository(WarehouseExport);
        this._accountRepository = appDataSource.getRepository(Account);
        this._userRepository = appDataSource.getRepository(User);
    }

    public setWarehouseExport(
        creatorId: number,
        receiptId: number,
        note: string,
        warehouseExport: WarehouseExport
    ): WarehouseExport {
        warehouseExport.creatorId = creatorId;
        warehouseExport.receiptId = receiptId;
        warehouseExport.note = note;
        return warehouseExport;
    }

    public async getAllWarehouseExport(): Promise<WarehouseExport[]> {
        return this._warehouseExportRepository.find();
    }

    public async getWarehouseExportById(id: number): Promise<WarehouseExport> {
        return this._warehouseExportRepository.findOneBy({id});
    }

    public async addWarehouseExport(
        creatorId: number,
        receiptId: number,
        note: string,
    ): Promise<WarehouseExport> {
        const account: Account = await this._accountRepository.findOneBy({id: creatorId});
        if (!account) {
            throw new Error(`Cant find account with id: ${creatorId}`);
        }
        const user: User = await this._userRepository.findOneBy({id: receiptId});
        if (!user) {
            throw new Error(`Cant find user with id: ${receiptId}`);
        }
        const warehouseExport = new WarehouseExport();
        this.setWarehouseExport(creatorId, receiptId, note, warehouseExport);
        return this.saveWarehouseExport(warehouseExport);
    }

    public async updateWarehouseExport(
        id: number,
        creatorId: number,
        receiptId: number,
        createdDate: Date,
        note: string
    ): Promise<WarehouseExport> {
        const account: Account = await this._accountRepository.findOneBy({id: creatorId});
        if (!account) {
            throw new Error(`Cant find account with id: ${creatorId}`);
        }
        const user: User = await this._userRepository.findOneBy({id: receiptId});
        if (!user) {
            throw new Error(`Cant find user with id: ${receiptId}`);
        }
        const warehouseExport = await this._warehouseExportRepository.findOneBy({id});
        if (!warehouseExport) {
            throw new Error(`Cant find warehouseExport with id: ${id}`);
        }
        this.setWarehouseExport(creatorId, receiptId, note, warehouseExport);
        return this.saveWarehouseExport(warehouseExport);
    }

    public async removeWarehouseExport(id: number): Promise<WarehouseExport> {
        const warehouseExport = await this._warehouseExportRepository.findOneBy({id});
        if (!warehouseExport) {
            throw new Error(`Cant find warehouseExport with id: ${id}`);
        }
        return this._warehouseExportRepository.remove(warehouseExport);
    }

    public async saveWarehouseExport(warehouseExport: WarehouseExport): Promise<WarehouseExport> {
        if (warehouseExport) {
            return this._warehouseExportRepository.save(warehouseExport);
        }
        return null;
    }
}

export const warehouseExportRepositoryController = new WarehouseExportRepository();
