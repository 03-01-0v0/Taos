import {Repository} from 'typeorm';
import {Product} from '../entity/Product';
import {ProductType} from '../entity/ProductType';
import {Unit} from '../entity/Unit';
import {appDataSource} from '../data-source';

class ProductRepository {
    private _productRepository: Repository<Product>;
    private _productTypeRepository: Repository<ProductType>;
    private _unitRepository: Repository<Unit>;

    constructor() {
        this._productRepository = appDataSource.getRepository(Product);
        this._productTypeRepository = appDataSource.getRepository(ProductType);
        this._unitRepository = appDataSource.getRepository(Unit);
    }

    public setProduct(
        productTypeId: number,
        unitId: number,
        code: string,
        name: string,
        img: string[],
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
        img: string[],
        quantity: number,
        purchasePrice: number,
        price: number,
        shortDescription: string,
        description: string,
        isSell: boolean
    ): Promise<Product> {
        const productType: ProductType = await this._productTypeRepository.findOneBy({
            id: productTypeId,
        });
        if (!productType) {
            throw new Error(`Cant find productType with id: ${productTypeId}`);
        }
        const unit: Unit = await this._unitRepository.findOneBy({id: unitId});
        if (!unit) {
            throw new Error(`Cant find unit with id: ${unit}`);
        }
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
        img: string[],
        quantity: number,
        purchasePrice: number,
        price: number,
        shortDescription: string,
        description: string,
        isSell: boolean
    ): Promise<Product> {
        const productType: ProductType = await this._productTypeRepository.findOneBy({
            id: productTypeId,
        });
        if (!productType) {
            throw new Error(`Cant find productType with id: ${productTypeId}`);
        }
        const unit: Unit = await this._unitRepository.findOneBy({id: unitId});
        if (!unit) {
            throw new Error(`Cant find unit with id: ${unit}`);
        }
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

    public async addListProduct() {
        return this._productRepository.insert(products);
    }

    public async getProductByQuantity(quantity: number): Promise<Product[]> {
        return this._productRepository.find({
            order: {
                id: 'DESC',
            },
            take: quantity,
        });
    }

    public async getProductSlider(color: string, name: string): Promise<Product> {
        return this._productRepository.findOneBy({
            name: name,
            color: color
        })
    }

    public async getProductByName(name: string): Promise<Product[]> {
        return this._productRepository.createQueryBuilder('product').where('lower(product.name) like :condition', {condition: "%" + name.toLowerCase() + "%"}).getMany();
    }
}

const products = [
    {
        productTypeId: 10,
        unitId: 1,
        code: '#1160',
        name: 'iPhone 14 Pro Max',
        quantity: 10,
        purchasePrice: 35000000,
        price: 39000000,
        shortDescription: 'iPhone 14 Pro Max',
        description:
            'Với thế hệ iPhone 14 mới được ra mắt thì Apple vẫn quyết định giữ lại phong cách thiết kế vuông vức quen thuộc. Dù đã xuất hiện từ trên thế hệ iPhone 12 nhưng theo mình đánh giá đây vẫn là một trong những sản phẩm có ngoại hình đẹp mắt và hợp thời cho đến thời điểm hiện tại. Thiết kế của iPhone 14 cũng trông khá tương đồng với người tiền nhiệm của mình khi có hai mặt trước sau bằng kính và khung viền kim loại vuông vức cùng các góc được bo cong mềm mại, tạo sự hài hòa và mang lại cảm giác cầm nắm dễ chịu. Mặt sau của iPhone 14 ta sẽ bắt gặp logo "táo khuyết" quen thuộc cùng cụm hai camera với ống kính lồi lên khá cao được đặt ở góc trái. Màn hình của iPhone 14 vẫn sẽ sử dụng thiết kế màn hình ‘Tai thỏ’, cách thiết kế đặc trưng trên nhiều thế hệ iPhone trước đây.',
        isSell: true,
        img: ['iphone-14-promax-purple1', 'iphone-14-promax-purple2', 'iphone-14-promax-purple3'],
        color: 'purple',
        capacity: '512GB',
    },
    {
        productTypeId: 10,
        unitId: 1,
        code: '#1161',
        name: 'iPhone 14 Pro Max',
        quantity: 10,
        purchasePrice: 35000000,
        price: 39000000,
        shortDescription: 'iPhone 14 Pro Max',
        description:
            'Với thế hệ iPhone 14 mới được ra mắt thì Apple vẫn quyết định giữ lại phong cách thiết kế vuông vức quen thuộc. Dù đã xuất hiện từ trên thế hệ iPhone 12 nhưng theo mình đánh giá đây vẫn là một trong những sản phẩm có ngoại hình đẹp mắt và hợp thời cho đến thời điểm hiện tại. Thiết kế của iPhone 14 cũng trông khá tương đồng với người tiền nhiệm của mình khi có hai mặt trước sau bằng kính và khung viền kim loại vuông vức cùng các góc được bo cong mềm mại, tạo sự hài hòa và mang lại cảm giác cầm nắm dễ chịu. Mặt sau của iPhone 14 ta sẽ bắt gặp logo "táo khuyết" quen thuộc cùng cụm hai camera với ống kính lồi lên khá cao được đặt ở góc trái. Màn hình của iPhone 14 vẫn sẽ sử dụng thiết kế màn hình ‘Tai thỏ’, cách thiết kế đặc trưng trên nhiều thế hệ iPhone trước đây.',
        isSell: true,
        img: ['iphone-14-promax-silver1', 'iphone-14-promax-silver2', 'iphone-14-promax-silver3'],
        color: 'silver',
        capacity: '512GB',
    },
    {
        productTypeId: 10,
        unitId: 1,
        code: '#1162',
        name: 'iPhone 14 Pro Max',
        quantity: 10,
        purchasePrice: 35000000,
        price: 39000000,
        shortDescription: 'iPhone 14 Pro Max',
        description:
            'Với thế hệ iPhone 14 mới được ra mắt thì Apple vẫn quyết định giữ lại phong cách thiết kế vuông vức quen thuộc. Dù đã xuất hiện từ trên thế hệ iPhone 12 nhưng theo mình đánh giá đây vẫn là một trong những sản phẩm có ngoại hình đẹp mắt và hợp thời cho đến thời điểm hiện tại. Thiết kế của iPhone 14 cũng trông khá tương đồng với người tiền nhiệm của mình khi có hai mặt trước sau bằng kính và khung viền kim loại vuông vức cùng các góc được bo cong mềm mại, tạo sự hài hòa và mang lại cảm giác cầm nắm dễ chịu. Mặt sau của iPhone 14 ta sẽ bắt gặp logo "táo khuyết" quen thuộc cùng cụm hai camera với ống kính lồi lên khá cao được đặt ở góc trái. Màn hình của iPhone 14 vẫn sẽ sử dụng thiết kế màn hình ‘Tai thỏ’, cách thiết kế đặc trưng trên nhiều thế hệ iPhone trước đây.',
        isSell: true,
        img: ['iphone-14-promax-gold1', 'iphone-14-promax-gold2', 'iphone-14-promax-gold3'],
        color: 'gold',
        capacity: '512GB',
    },
    {
        productTypeId: 10,
        unitId: 1,
        code: '#1163',
        name: 'iPhone 14 Pro Max',
        quantity: 10,
        purchasePrice: 35000000,
        price: 39000000,
        shortDescription: 'iPhone 14 Pro Max',
        description:
            'Với thế hệ iPhone 14 mới được ra mắt thì Apple vẫn quyết định giữ lại phong cách thiết kế vuông vức quen thuộc. Dù đã xuất hiện từ trên thế hệ iPhone 12 nhưng theo mình đánh giá đây vẫn là một trong những sản phẩm có ngoại hình đẹp mắt và hợp thời cho đến thời điểm hiện tại. Thiết kế của iPhone 14 cũng trông khá tương đồng với người tiền nhiệm của mình khi có hai mặt trước sau bằng kính và khung viền kim loại vuông vức cùng các góc được bo cong mềm mại, tạo sự hài hòa và mang lại cảm giác cầm nắm dễ chịu. Mặt sau của iPhone 14 ta sẽ bắt gặp logo "táo khuyết" quen thuộc cùng cụm hai camera với ống kính lồi lên khá cao được đặt ở góc trái. Màn hình của iPhone 14 vẫn sẽ sử dụng thiết kế màn hình ‘Tai thỏ’, cách thiết kế đặc trưng trên nhiều thế hệ iPhone trước đây.',
        isSell: true,
        img: ['iphone-14-promax-purple1', 'iphone-14-promax-purple2', 'iphone-14-promax-purple3'],
        color: 'purple',
        capacity: '128GB',
    },
    {
        productTypeId: 10,
        unitId: 1,
        code: '#1164',
        name: 'iPhone 14 Pro Max',
        quantity: 10,
        purchasePrice: 35000000,
        price: 39000000,
        shortDescription: 'iPhone 14 Pro Max',
        description:
            'Với thế hệ iPhone 14 mới được ra mắt thì Apple vẫn quyết định giữ lại phong cách thiết kế vuông vức quen thuộc. Dù đã xuất hiện từ trên thế hệ iPhone 12 nhưng theo mình đánh giá đây vẫn là một trong những sản phẩm có ngoại hình đẹp mắt và hợp thời cho đến thời điểm hiện tại. Thiết kế của iPhone 14 cũng trông khá tương đồng với người tiền nhiệm của mình khi có hai mặt trước sau bằng kính và khung viền kim loại vuông vức cùng các góc được bo cong mềm mại, tạo sự hài hòa và mang lại cảm giác cầm nắm dễ chịu. Mặt sau của iPhone 14 ta sẽ bắt gặp logo "táo khuyết" quen thuộc cùng cụm hai camera với ống kính lồi lên khá cao được đặt ở góc trái. Màn hình của iPhone 14 vẫn sẽ sử dụng thiết kế màn hình ‘Tai thỏ’, cách thiết kế đặc trưng trên nhiều thế hệ iPhone trước đây.',
        isSell: true,
        img: ['iphone-14-promax-gold1', 'iphone-14-promax-gold2', 'iphone-14-promax-gold3'],
        color: 'gold',
        capacity: '128GB',
    },
    {
        productTypeId: 10,
        unitId: 1,
        code: '#1165',
        name: 'iPhone 14 Pro Max',
        quantity: 10,
        purchasePrice: 35000000,
        price: 39000000,
        shortDescription: 'iPhone 14 Pro Max',
        description:
            'Với thế hệ iPhone 14 mới được ra mắt thì Apple vẫn quyết định giữ lại phong cách thiết kế vuông vức quen thuộc. Dù đã xuất hiện từ trên thế hệ iPhone 12 nhưng theo mình đánh giá đây vẫn là một trong những sản phẩm có ngoại hình đẹp mắt và hợp thời cho đến thời điểm hiện tại. Thiết kế của iPhone 14 cũng trông khá tương đồng với người tiền nhiệm của mình khi có hai mặt trước sau bằng kính và khung viền kim loại vuông vức cùng các góc được bo cong mềm mại, tạo sự hài hòa và mang lại cảm giác cầm nắm dễ chịu. Mặt sau của iPhone 14 ta sẽ bắt gặp logo "táo khuyết" quen thuộc cùng cụm hai camera với ống kính lồi lên khá cao được đặt ở góc trái. Màn hình của iPhone 14 vẫn sẽ sử dụng thiết kế màn hình ‘Tai thỏ’, cách thiết kế đặc trưng trên nhiều thế hệ iPhone trước đây.',
        isSell: true,
        img: ['iphone-14-promax-silver1', 'iphone-14-promax-silver2', 'iphone-14-promax-silver3'],
        color: 'silver',
        capacity: '128GB',
    },
    {
        productTypeId: 10,
        unitId: 1,
        code: '#1166',
        name: 'iPhone 14 Pro Max',
        quantity: 10,
        purchasePrice: 35000000,
        price: 39000000,
        shortDescription: 'iPhone 14 Pro Max',
        description:
            'Với thế hệ iPhone 14 mới được ra mắt thì Apple vẫn quyết định giữ lại phong cách thiết kế vuông vức quen thuộc. Dù đã xuất hiện từ trên thế hệ iPhone 12 nhưng theo mình đánh giá đây vẫn là một trong những sản phẩm có ngoại hình đẹp mắt và hợp thời cho đến thời điểm hiện tại. Thiết kế của iPhone 14 cũng trông khá tương đồng với người tiền nhiệm của mình khi có hai mặt trước sau bằng kính và khung viền kim loại vuông vức cùng các góc được bo cong mềm mại, tạo sự hài hòa và mang lại cảm giác cầm nắm dễ chịu. Mặt sau của iPhone 14 ta sẽ bắt gặp logo "táo khuyết" quen thuộc cùng cụm hai camera với ống kính lồi lên khá cao được đặt ở góc trái. Màn hình của iPhone 14 vẫn sẽ sử dụng thiết kế màn hình ‘Tai thỏ’, cách thiết kế đặc trưng trên nhiều thế hệ iPhone trước đây.',
        isSell: true,
        img: ['iphone-14-promax-purple1', 'iphone-14-promax-purple2', 'iphone-14-promax-purple3'],
        color: 'purple',
        capacity: '256GB',
    },
    {
        productTypeId: 10,
        unitId: 1,
        code: '#1167',
        name: 'iPhone 14 Pro Max',
        quantity: 10,
        purchasePrice: 35000000,
        price: 39000000,
        shortDescription: 'iPhone 14 Pro Max',
        description:
            'Với thế hệ iPhone 14 mới được ra mắt thì Apple vẫn quyết định giữ lại phong cách thiết kế vuông vức quen thuộc. Dù đã xuất hiện từ trên thế hệ iPhone 12 nhưng theo mình đánh giá đây vẫn là một trong những sản phẩm có ngoại hình đẹp mắt và hợp thời cho đến thời điểm hiện tại. Thiết kế của iPhone 14 cũng trông khá tương đồng với người tiền nhiệm của mình khi có hai mặt trước sau bằng kính và khung viền kim loại vuông vức cùng các góc được bo cong mềm mại, tạo sự hài hòa và mang lại cảm giác cầm nắm dễ chịu. Mặt sau của iPhone 14 ta sẽ bắt gặp logo "táo khuyết" quen thuộc cùng cụm hai camera với ống kính lồi lên khá cao được đặt ở góc trái. Màn hình của iPhone 14 vẫn sẽ sử dụng thiết kế màn hình ‘Tai thỏ’, cách thiết kế đặc trưng trên nhiều thế hệ iPhone trước đây.',
        isSell: true,
        img: ['iphone-14-promax-gold1', 'iphone-14-promax-gold2', 'iphone-14-promax-gold3'],
        color: 'gold',
        capacity: '256GB',
    },
    {
        productTypeId: 10,
        unitId: 1,
        code: '#1168',
        name: 'iPhone 14 Pro Max',
        quantity: 10,
        purchasePrice: 35000000,
        price: 39000000,
        shortDescription: 'iPhone 14 Pro Max',
        description:
            'Với thế hệ iPhone 14 mới được ra mắt thì Apple vẫn quyết định giữ lại phong cách thiết kế vuông vức quen thuộc. Dù đã xuất hiện từ trên thế hệ iPhone 12 nhưng theo mình đánh giá đây vẫn là một trong những sản phẩm có ngoại hình đẹp mắt và hợp thời cho đến thời điểm hiện tại. Thiết kế của iPhone 14 cũng trông khá tương đồng với người tiền nhiệm của mình khi có hai mặt trước sau bằng kính và khung viền kim loại vuông vức cùng các góc được bo cong mềm mại, tạo sự hài hòa và mang lại cảm giác cầm nắm dễ chịu. Mặt sau của iPhone 14 ta sẽ bắt gặp logo "táo khuyết" quen thuộc cùng cụm hai camera với ống kính lồi lên khá cao được đặt ở góc trái. Màn hình của iPhone 14 vẫn sẽ sử dụng thiết kế màn hình ‘Tai thỏ’, cách thiết kế đặc trưng trên nhiều thế hệ iPhone trước đây.',
        isSell: true,
        img: ['iphone-14-promax-silver1', 'iphone-14-promax-silver2', 'iphone-14-promax-silver3'],
        color: 'silver',
        capacity: '256GB',
    },
];

export const productRepositoryController = new ProductRepository();
