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
}

export const productTypeRepositoryController = new ProductTypeRepository();
