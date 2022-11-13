import {Repository} from 'typeorm';
import {WareHouseReceipt} from '../entity/WarehouseReceipt';
import {appDataSource} from '../data-source';

class WarehouseReceiptRepository {
    private _warehouseReceiptRepository: Repository<WareHouseReceipt>;

    constructor() {
        this._warehouseReceiptRepository = appDataSource.getRepository(WareHouseReceipt);
    }

    public async getAllWarehouseReceipt(): Promise<WareHouseReceipt[]> {
        return this._warehouseReceiptRepository.find();
    }

    public async getWarehouseExportById(id: number): Promise<WareHouseReceipt> {
        return this._warehouseReceiptRepository.findOneBy({id});
    }

    public setWarehouseReceipt(
        creatorId: number,
        receiverId: number,
        createdDate: Date,
        note: string,
        warehouseReceipt: WareHouseReceipt
    ): WareHouseReceipt {
        warehouseReceipt.creatorId = creatorId;
        warehouseReceipt.receiverId = receiverId;
        warehouseReceipt.createdDate = createdDate;
        warehouseReceipt.note = note;
        return warehouseReceipt;
    }

    public async addWarehouseReceipt(
        creatorId: number,
        receiverId: number,
        createdDate: Date,
        note: string
    ): Promise<WareHouseReceipt> {
        const warehouseReceipt = new WareHouseReceipt();
        this.setWarehouseReceipt(creatorId, receiverId, createdDate, note, warehouseReceipt);
        return this.saveWarehouseReceipt(warehouseReceipt);
    }

    public async updateWarehouseReceipt(
        id: number,
        creatorId: number,
        receiverId: number,
        createdDate: Date,
        note: string
    ): Promise<WareHouseReceipt> {
        const warehouseReceipt = await this._warehouseReceiptRepository.findOneBy({id});
        if (!warehouseReceipt) {
            throw new Error(`Cant find warehouseReceipt with id: ${id}`);
        }
        this.setWarehouseReceipt(creatorId, receiverId, createdDate, note, warehouseReceipt);
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
