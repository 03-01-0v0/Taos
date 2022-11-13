import {Repository} from 'typeorm';
import {ProductType} from '../entity/ProductType';
import {appDataSource} from '../data-source';

export class ProductTypeRepository {
    private _productTypeRepository: Repository<ProductType>;

    constructor() {
        this._productTypeRepository = appDataSource.getRepository(ProductType);
    }

    public async getAllProductType(): Promise<ProductType[]> {
        return this._productTypeRepository.find();
    }

    public async getProductTypeById(id: number): Promise<ProductType> {
        return this._productTypeRepository.findOneBy({id});
    }

    public async addProductType(
        accountId: number,
        description: string,
        isSell: boolean
    ): Promise<ProductType> {
        const productType = new ProductType();
        productType.accountId = accountId;
        productType.description = description;
        productType.isSell = isSell;
        return this.saveProductType(productType);
    }

    public async updateProductType(
        id: number,
        accountId: number,
        description: string,
        isSell: boolean
    ): Promise<ProductType> {
        const productType = await this._productTypeRepository.findOneBy({id});
        if (!productType) {
            throw new Error(`Cant find product type with id: ${id}`);
        }
        productType.accountId = accountId;
        productType.description = description;
        productType.isSell = isSell;
        return this.saveProductType(productType);
    }

    public async removeProductType(id: number): Promise<ProductType> {
        const productType = await this._productTypeRepository.findOneBy({id});
        if (!productType) {
            throw new Error(`Cant find product type with id: ${id}`);
        }
        return this._productTypeRepository.remove(productType);
    }

    public async saveProductType(productType: ProductType): Promise<ProductType> {
        if (productType) {
            return this._productTypeRepository.save(productType);
        }
        return null;
    }
}

export const productTypeRepositoryController = new ProductTypeRepository();
