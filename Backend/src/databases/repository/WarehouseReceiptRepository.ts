import {Repository} from 'typeorm';
import {WareHouseReceipt} from '../entity/WarehouseReceipt';
import {Account} from '../entity/Account';
import {User} from '../entity/User';
import {appDataSource} from '../data-source';

class WarehouseReceiptRepository {
    private _warehouseReceiptRepository: Repository<WareHouseReceipt>;
    private _accountRepository: Repository<Account>;
    private _userRepository: Repository<User>;

    constructor() {
        this._warehouseReceiptRepository = appDataSource.getRepository(WareHouseReceipt);
        this._accountRepository = appDataSource.getRepository(Account);
        this._userRepository = appDataSource.getRepository(User);
    }

    public async getAllWarehouseReceipt(): Promise<WareHouseReceipt[]> {
        return this._warehouseReceiptRepository.find();
    }

    public async getWarehouseReceiptById(id: number): Promise<WareHouseReceipt> {
        return this._warehouseReceiptRepository.findOneBy({id});
    }

    public setWarehouseReceipt(
        creatorId: number,
        note: string,
        warehouseReceipt: WareHouseReceipt
    ): WareHouseReceipt {
        warehouseReceipt.creatorId = creatorId;
        warehouseReceipt.note = note;
        return warehouseReceipt;
    }

    public async addWarehouseReceipt(
        creatorId: number,
        note: string
    ): Promise<WareHouseReceipt> {
        const creator: Account = await this._accountRepository.findOneBy({id: creatorId});
        if (!creator) {
            throw new Error(`Cant find account with id: ${creatorId}`);
        }
        const warehouseReceipt = new WareHouseReceipt();
        this.setWarehouseReceipt(creatorId, note, warehouseReceipt);
        return this.saveWarehouseReceipt(warehouseReceipt);
    }

    public async updateWarehouseReceipt(
        id: number,
        creatorId: number,
        note: string
    ): Promise<WareHouseReceipt> {
        const creator: Account = await this._accountRepository.findOneBy({id: creatorId});
        if (!creator) {
            throw new Error(`Cant find account with id: ${creatorId}`);
        }
        const warehouseReceipt = await this._warehouseReceiptRepository.findOneBy({id});
        if (!warehouseReceipt) {
            throw new Error(`Cant find warehouseReceipt with id: ${id}`);
        }
        this.setWarehouseReceipt(creatorId, note, warehouseReceipt);
        return this.saveWarehouseReceipt(warehouseReceipt);
    }

    public async removeWarehouseReceipt(id: number): Promise<WareHouseReceipt> {
        const warehouseReceipt = await this._warehouseReceiptRepository.findOneBy({id});
        if (!warehouseReceipt) {
            throw new Error(`Cant find warehouseReceipt with id: ${id}`);
        }
        return this._warehouseReceiptRepository.remove(warehouseReceipt);
    }

    public async saveWarehouseReceipt(
        warehouseReceipt: WareHouseReceipt
    ): Promise<WareHouseReceipt> {
        if (warehouseReceipt) {
            return this._warehouseReceiptRepository.save(warehouseReceipt);
        }
        return null;
    }
}

export const warehouseReceiptRepositoryController = new WarehouseReceiptRepository();
