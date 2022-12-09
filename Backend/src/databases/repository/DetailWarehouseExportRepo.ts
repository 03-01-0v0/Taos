import {Repository} from 'typeorm';
import {DetailWarehouseExport} from '../entity/DetailWarehouseExport';
import {WarehouseExport} from '../entity/WarehouseExport';
import {Product} from '../entity/Product';
import {appDataSource} from '../data-source';

class DetailWarehouseExportRepo {
    private _detailWarehouseExportRepo: Repository<DetailWarehouseExport>;
    private _warehouseExportRepo: Repository<WarehouseExport>;
    private _productRepository: Repository<Product>;

    constructor() {
        this._detailWarehouseExportRepo = appDataSource.getRepository(DetailWarehouseExport);
        this._warehouseExportRepo = appDataSource.getRepository(WarehouseExport);
        this._productRepository = appDataSource.getRepository(Product);
    }

    public async getAllDetailWarehouseExport(): Promise<DetailWarehouseExport[]> {
        return this._detailWarehouseExportRepo.query(`SELECT detail_warehouse_export.id, "warehouseExportId", warehouse_export_user."creatorId", warehouse_export_user."receiptId", warehouse_export_user."userName", name, detail_warehouse_export."productId", detail_warehouse_export.quantity, detail_warehouse_export."createdDate", detail_warehouse_export."updatedDate", detail_warehouse_export.color, detail_warehouse_export.capacity FROM public.detail_warehouse_export left join warehouse_export_user on "warehouseExportId" = warehouse_export_user.id
        left join product on "productId" = product.id;`);
    }

    public async getWarehouseExportById(id: number): Promise<DetailWarehouseExport> {
        return this._detailWarehouseExportRepo.findOneBy({id});
    }

    public setDetailWarehouseExport(
        warehouseExportId: number,
        productId: number,
        quantity: number,
        color: string,
        capacity: string,
        detailWarehouseExport: DetailWarehouseExport
    ): DetailWarehouseExport {
        detailWarehouseExport.warehouseExportId = warehouseExportId;
        detailWarehouseExport.productId = productId;
        detailWarehouseExport.quantity = quantity;
        detailWarehouseExport.color = color;
        detailWarehouseExport.capacity = capacity;
        return detailWarehouseExport;
    }

    public async addDetailWarehouseExport(
        warehouseExportId: number,
        productId: number,
        quantity: number,
        color: string,
        capacity: string,
    ): Promise<DetailWarehouseExport> {
        const warehouseExport: WarehouseExport = await this._warehouseExportRepo.findOneBy({
            id: warehouseExportId,
        });
        if (!warehouseExport) {
            throw new Error(`Cant find warehouseExport with id: ${warehouseExportId}`);
        }
        const product: Product = await this._productRepository.findOneBy({id: productId});
        if (!product) {
            throw new Error(`Cant find product with id: ${productId}`);
        }        
        const detailWarehouseExport = new DetailWarehouseExport();
        this.setDetailWarehouseExport(
            warehouseExportId,
            productId,
            quantity,
            color,
            capacity,
            detailWarehouseExport
        );
        console.log(detailWarehouseExport);
        
        return this.saveDetailWarehouseExport(detailWarehouseExport);
    }

    public async updateDetailWarehouseExport(
        id: number,
        warehouseExportId: number,
        productId: number,
        quantity: number,
        color: string,
        capacity: string,
    ): Promise<DetailWarehouseExport> {
        const warehouseExport: WarehouseExport = await this._warehouseExportRepo.findOneBy({
            id: warehouseExportId,
        });
        if (!warehouseExport) {
            throw new Error(`Cant find warehouseExport with id: ${warehouseExportId}`);
        }
        const product: Product = await this._productRepository.findOneBy({id: productId});
        if (!product) {
            throw new Error(`Cant find product with id: ${productId}`);
        }
        const detailWarehouseExport = await this._detailWarehouseExportRepo.findOneBy({id});
        if (!detailWarehouseExport) {
            throw new Error(`Cant find warehouseReceipt with id: ${id}`);
        }
        this.setDetailWarehouseExport(
            warehouseExportId,
            productId,
            quantity,
            color,
            capacity,
            detailWarehouseExport
        );
        return this.saveDetailWarehouseExport(detailWarehouseExport);
    }

    public async removeDetailWarehouseExport(id: number): Promise<DetailWarehouseExport> {
        const detailWarehouseExport = await this._detailWarehouseExportRepo.findOneBy({id});
        if (!detailWarehouseExport) {
            throw new Error(`Cant find warehouseReceipt with id: ${id}`);
        }
        return this._detailWarehouseExportRepo.remove(detailWarehouseExport);
    }

    public async saveDetailWarehouseExport(
        detailWarehouseExport: DetailWarehouseExport
    ): Promise<DetailWarehouseExport> {
        if (detailWarehouseExport) {            
            return this._detailWarehouseExportRepo.save(detailWarehouseExport);
        }
        return null;
    }
}

export const detailWarehouseExportController = new DetailWarehouseExportRepo();
