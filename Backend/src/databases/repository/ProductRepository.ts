import {Repository} from 'typeorm';
import {Product} from '../entity/Product';
import {appDataSource} from '../data-source';

class ProductRepository {
    private _productRepository: Repository<Product>;

    constructor() {
        this._productRepository = appDataSource.getRepository(Product);
    }

    public setProduct(
        productTypeId: number,
        unitId: number,
        code: string,
        name: string,
        img: string,
        quantity: number,
        purchasePrice: number,
        price: number,
        shortDescription: string,
        description: string,
        isSell: boolean,
        product: Product
    ): Product {
        product.productTypeId = productTypeId;
        product.unitId = unitId;
        product.code = code;
        product.name = name;
        product.img = img;
        product.quantity = quantity;
        product.purchasePrice = purchasePrice;
        product.price = price;
        product.shortDescription = shortDescription;
        product.description = description;
        product.isSell = isSell;
        return product;
    }

    public async getAllProduct(): Promise<Product[]> {
        return this._productRepository.find();
    }

    public async getProductById(id: number): Promise<Product> {
        return this._productRepository.findOneBy({id});
    }

    public async addProduct(
        productTypeId: number,
        unitId: number,
        code: string,
        name: string,
        img: string,
        quantity: number,
        purchasePrice: number,
        price: number,
        shortDescription: string,
        description: string,
        isSell: boolean
    ): Promise<Product> {
        const product = new Product();
        this.setProduct(
            productTypeId,
            unitId,
            code,
            name,
            img,
            quantity,
            purchasePrice,
            price,
            shortDescription,
            description,
            isSell,
            product
        );
        return this.saveProduct(product);
    }

    public async updateProduct(
        id: number,
        productTypeId: number,
        unitId: number,
        code: string,
        name: string,
        img: string,
        quantity: number,
        purchasePrice: number,
        price: number,
        shortDescription: string,
        description: string,
        isSell: boolean
    ): Promise<Product> {
        const product = await this._productRepository.findOneBy({id});
        if (!product) {
            throw new Error(`Cant find product with id: ${id}`);
        }
        this.setProduct(
            productTypeId,
            unitId,
            code,
            name,
            img,
            quantity,
            purchasePrice,
            price,
            shortDescription,
            description,
            isSell,
            product
        );
        return this.saveProduct(product);
    }

    public async removeProduct(id: number): Promise<Product> {
        const product = await this._productRepository.findOneBy({id});
        if (!product) {
            throw new Error(`Cant find product with id: ${id}`);
        }
        return this._productRepository.remove(product);
    }

    public async saveProduct(product: Product): Promise<Product> {
        if (product) {
            return this._productRepository.save(product);
        }
        return null;
    }
}

export const productRepositoryController = new ProductRepository();
