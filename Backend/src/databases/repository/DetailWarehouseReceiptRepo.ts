import { Repository } from 'typeorm';
import { appDataSource } from '../data-source';
import { DetailWareHouseReceipt } from '../entity/DetailWarehouseReceipt';
import { WareHouseReceipt } from '../entity/WarehouseReceipt';
import { Product } from '../entity/Product';

class DetailWareHouseReceiptRepo {
    private _detailWareHouseReceiptRepo: Repository<DetailWareHouseReceipt>;
    private _wareHouseReceiptRepo: Repository<WareHouseReceipt>;
    private _productRepository: Repository<Product>;

    constructor() {
        this._detailWareHouseReceiptRepo = appDataSource.getRepository(DetailWareHouseReceipt);
        this._wareHouseReceiptRepo = appDataSource.getRepository(WareHouseReceipt);
        this._productRepository = appDataSource.getRepository(Product);
    }

    public async getAllDetailWareHouseReceipt(): Promise<DetailWareHouseReceipt[]> {
        return this._detailWareHouseReceiptRepo.query(`SELECT detail_ware_house_receipt.id, "creatorId", name, "warehouseReceiptId", "productId", detail_ware_house_receipt.quantity, detail_ware_house_receipt.color, detail_ware_house_receipt.capacity
        FROM public.detail_ware_house_receipt left join ware_house_receipt on "warehouseReceiptId" = ware_house_receipt.id left join product on detail_ware_house_receipt."productId" = product.id;`);
    }

    public async getDetailWareHouseReceiptById(id: number): Promise<DetailWareHouseReceipt> {
        return this._detailWareHouseReceiptRepo.findOneBy({id});
    }

    public setDetailWareHouseReceipt(
        warehouseReceiptId: number,
        productId: number,
        quantity: number,
        color: string,
        capacity: string,
        detailWareHouseReceipt: DetailWareHouseReceipt
    ): DetailWareHouseReceipt {
        detailWareHouseReceipt.warehouseReceiptId = warehouseReceiptId;
        detailWareHouseReceipt.productId = productId;
        detailWareHouseReceipt.quantity = quantity;
        detailWareHouseReceipt.color = color;
        detailWareHouseReceipt.capacity = capacity;
        return detailWareHouseReceipt;
    }

    public async addDetailWareHouseReceipt(
        warehouseReceiptId: number,
        productId: number,
        quantity: number,
        color: string,
        capacity: string,
    ): Promise<DetailWareHouseReceipt> {
        const warehouseReceipt: WareHouseReceipt = await this._wareHouseReceiptRepo.findOneBy({
            id: warehouseReceiptId,
        });
        if (!warehouseReceipt) {
            throw new Error(`Cant find warehouseExport with id: ${warehouseReceiptId}`);
        }
        const product: Product = await this._productRepository.findOneBy({id: productId});
        if (!product) {
            throw new Error(`Cant find product with id: ${productId}`);
        }
        const detailWareHouseReceipt = new DetailWareHouseReceipt();
        this.setDetailWareHouseReceipt(
            warehouseReceiptId,
            productId,
            quantity,
            color,
            capacity,
            detailWareHouseReceipt
        );
        return this.saveDetailWareHouseReceipt(detailWareHouseReceipt);
    }

    public async updateDetailWareHouseReceipt(
        id: number,
        warehouseReceiptId: number,
        productId: number,
        quantity: number,
        color: string,
        capacity: string,
    ): Promise<DetailWareHouseReceipt> {
        const warehouseReceipt: WareHouseReceipt = await this._wareHouseReceiptRepo.findOneBy({
            id: warehouseReceiptId,
        });
        if (!warehouseReceipt) {
            throw new Error(`Cant find warehouseExport with id: ${warehouseReceiptId}`);
        }
        const product: Product = await this._productRepository.findOneBy({id: productId});
        if (!product) {
            throw new Error(`Cant find product with id: ${productId}`);
        }
        const detailWareHouseReceipt = await this._detailWareHouseReceiptRepo.findOneBy({id});
        if (!detailWareHouseReceipt) {
            throw new Error(`Cant find warehouseReceipt with id: ${id}`);
        }
        this.setDetailWareHouseReceipt(
            warehouseReceiptId,
            productId,
            quantity,
            color,
            capacity,
            detailWareHouseReceipt
        );
        return this.saveDetailWareHouseReceipt(detailWareHouseReceipt);
    }

    public async removeDetailWareHouseReceipt(id: number): Promise<DetailWareHouseReceipt> {
        const detailWareHouseReceipt = await this._detailWareHouseReceiptRepo.findOneBy({id});
        if (!detailWareHouseReceipt) {
            throw new Error(`Cant find detailWareHouseReceipt with id: ${id}`);
        }
        return this._detailWareHouseReceiptRepo.remove(detailWareHouseReceipt);
    }

    public async saveDetailWareHouseReceipt(
        detailWareHouseReceipt: DetailWareHouseReceipt
    ): Promise<DetailWareHouseReceipt> {
        if (detailWareHouseReceipt) {
            return this._detailWareHouseReceiptRepo.save(detailWareHouseReceipt);
        }
        return null;
    }
}

export const detailWareHouseReceiptController = new DetailWareHouseReceiptRepo();