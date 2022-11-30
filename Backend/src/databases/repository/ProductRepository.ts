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
}

const products = [
    {
        productTypeId: 7,
        unitId: 1,
        code: '#1131',
        name: 'iPhone 13 Pro',
        quantity: 10,
        purchasePrice: 20000000,
        price: 27000000,
        shortDescription: 'iPhone 13 Pro',
        description:
            'Xét về phong cách thiết kế, iPhone 13 năm nay vẫn sở hữu khung viền vuông vức giống như trên dòng iPhone 12 trước đó. Theo trải nghiệm của tác giả thì iPhone 13 vẫn mang lại cho người dùng cảm giác cầm nắm thoải mái và chắc chắn. Ngoài ra thì ở phần mặt sau và mặt trước của iPhone 13 đều được trang bị một lớp kính nhưng chỉ có phần mặt trước của máy sẽ được trang bị lớp bảo vệ Ceramic Shield mà thôi. Cụ thể thì lớp bảo vệ này giúp mặt kính của chiếc iPhone 13 trở nên bền hơn, chống trầy xước và nứt vỡ tốt hơn một chút so với thế hệ tiền nhiệm. Mặc dù vậy thì tác giả nghĩ rằng nếu Apple trang bị công nghệ Ceramic Shield đó ở cả mặt sau của iPhone 13 thì thật sự quá tuyệt vời. Chiếc điện thoại khi đó sẽ được bảo vệ an toàn một cách trọn vẹn nhất. Điều này cũng làm cho người dùng chúng ta cảm thấy yên tâm hơn trong quá trình sử dụng.',
        isSell: true,
        img: ['iphone-13-pro-blue1', 'iphone-13-pro-blue2', 'iphone-13-pro-blue3'],
        color: 'blue',
        capacity: '512GB'
    },
    {
        productTypeId: 7,
        unitId: 1,
        code: '#1131',
        name: 'iPhone 13 Pro',
        quantity: 10,
        purchasePrice: 20000000,
        price: 27000000,
        shortDescription: 'iPhone 13 Pro',
        description:
            'Xét về phong cách thiết kế, iPhone 13 năm nay vẫn sở hữu khung viền vuông vức giống như trên dòng iPhone 12 trước đó. Theo trải nghiệm của tác giả thì iPhone 13 vẫn mang lại cho người dùng cảm giác cầm nắm thoải mái và chắc chắn. Ngoài ra thì ở phần mặt sau và mặt trước của iPhone 13 đều được trang bị một lớp kính nhưng chỉ có phần mặt trước của máy sẽ được trang bị lớp bảo vệ Ceramic Shield mà thôi. Cụ thể thì lớp bảo vệ này giúp mặt kính của chiếc iPhone 13 trở nên bền hơn, chống trầy xước và nứt vỡ tốt hơn một chút so với thế hệ tiền nhiệm. Mặc dù vậy thì tác giả nghĩ rằng nếu Apple trang bị công nghệ Ceramic Shield đó ở cả mặt sau của iPhone 13 thì thật sự quá tuyệt vời. Chiếc điện thoại khi đó sẽ được bảo vệ an toàn một cách trọn vẹn nhất. Điều này cũng làm cho người dùng chúng ta cảm thấy yên tâm hơn trong quá trình sử dụng.',
        isSell: true,
        img: ['iphone-13-pro-graphite1', 'iphone-13-pro-graphite2', 'iphone-13-pro-graphite3'],
        color: 'graphite',
        capacity: '512GB'
    },
    {
        productTypeId: 7,
        unitId: 1,
        code: '#1132',
        name: 'iPhone 13 Pro',
        quantity: 10,
        purchasePrice: 20000000,
        price: 27000000,
        shortDescription: 'iPhone 13 Pro',
        description:
            'Xét về phong cách thiết kế, iPhone 13 năm nay vẫn sở hữu khung viền vuông vức giống như trên dòng iPhone 12 trước đó. Theo trải nghiệm của tác giả thì iPhone 13 vẫn mang lại cho người dùng cảm giác cầm nắm thoải mái và chắc chắn. Ngoài ra thì ở phần mặt sau và mặt trước của iPhone 13 đều được trang bị một lớp kính nhưng chỉ có phần mặt trước của máy sẽ được trang bị lớp bảo vệ Ceramic Shield mà thôi. Cụ thể thì lớp bảo vệ này giúp mặt kính của chiếc iPhone 13 trở nên bền hơn, chống trầy xước và nứt vỡ tốt hơn một chút so với thế hệ tiền nhiệm. Mặc dù vậy thì tác giả nghĩ rằng nếu Apple trang bị công nghệ Ceramic Shield đó ở cả mặt sau của iPhone 13 thì thật sự quá tuyệt vời. Chiếc điện thoại khi đó sẽ được bảo vệ an toàn một cách trọn vẹn nhất. Điều này cũng làm cho người dùng chúng ta cảm thấy yên tâm hơn trong quá trình sử dụng.',
        isSell: true,
        img: ['iphone-13-pro-green1', 'iphone-13-pro-green2', 'iphone-13-pro-green3'],
        color: 'green',
        capacity: '512GB'
    },
    {
        productTypeId: 7,
        unitId: 1,
        code: '#1133',
        name: 'iPhone 13 Pro',
        quantity: 10,
        purchasePrice: 20000000,
        price: 27000000,
        shortDescription: 'iPhone 13 Pro',
        description:
            'Xét về phong cách thiết kế, iPhone 13 năm nay vẫn sở hữu khung viền vuông vức giống như trên dòng iPhone 12 trước đó. Theo trải nghiệm của tác giả thì iPhone 13 vẫn mang lại cho người dùng cảm giác cầm nắm thoải mái và chắc chắn. Ngoài ra thì ở phần mặt sau và mặt trước của iPhone 13 đều được trang bị một lớp kính nhưng chỉ có phần mặt trước của máy sẽ được trang bị lớp bảo vệ Ceramic Shield mà thôi. Cụ thể thì lớp bảo vệ này giúp mặt kính của chiếc iPhone 13 trở nên bền hơn, chống trầy xước và nứt vỡ tốt hơn một chút so với thế hệ tiền nhiệm. Mặc dù vậy thì tác giả nghĩ rằng nếu Apple trang bị công nghệ Ceramic Shield đó ở cả mặt sau của iPhone 13 thì thật sự quá tuyệt vời. Chiếc điện thoại khi đó sẽ được bảo vệ an toàn một cách trọn vẹn nhất. Điều này cũng làm cho người dùng chúng ta cảm thấy yên tâm hơn trong quá trình sử dụng.',
        isSell: true,
        img: ['iphone-13-pro-blue1', 'iphone-13-pro-blue2', 'iphone-13-pro-blue3'],
        color: 'blue',
        capacity: '128GB'
    },
    {
        productTypeId: 7,
        unitId: 1,
        code: '#1134',
        name: 'iPhone 13 Pro',
        quantity: 10,
        purchasePrice: 20000000,
        price: 27000000,
        shortDescription: 'iPhone 13 Pro',
        description:
            'Xét về phong cách thiết kế, iPhone 13 năm nay vẫn sở hữu khung viền vuông vức giống như trên dòng iPhone 12 trước đó. Theo trải nghiệm của tác giả thì iPhone 13 vẫn mang lại cho người dùng cảm giác cầm nắm thoải mái và chắc chắn. Ngoài ra thì ở phần mặt sau và mặt trước của iPhone 13 đều được trang bị một lớp kính nhưng chỉ có phần mặt trước của máy sẽ được trang bị lớp bảo vệ Ceramic Shield mà thôi. Cụ thể thì lớp bảo vệ này giúp mặt kính của chiếc iPhone 13 trở nên bền hơn, chống trầy xước và nứt vỡ tốt hơn một chút so với thế hệ tiền nhiệm. Mặc dù vậy thì tác giả nghĩ rằng nếu Apple trang bị công nghệ Ceramic Shield đó ở cả mặt sau của iPhone 13 thì thật sự quá tuyệt vời. Chiếc điện thoại khi đó sẽ được bảo vệ an toàn một cách trọn vẹn nhất. Điều này cũng làm cho người dùng chúng ta cảm thấy yên tâm hơn trong quá trình sử dụng.',
        isSell: true,
        img: ['iphone-13-pro-green1', 'iphone-13-pro-green2', 'iphone-13-pro-green3'],
        color: 'green',
        capacity: '128GB'
    },
    {
        productTypeId: 7,
        unitId: 1,
        code: '#1134',
        name: 'iPhone 13 Pro',
        quantity: 10,
        purchasePrice: 20000000,
        price: 27000000,
        shortDescription: 'iPhone 13 Pro',
        description:
            'Xét về phong cách thiết kế, iPhone 13 năm nay vẫn sở hữu khung viền vuông vức giống như trên dòng iPhone 12 trước đó. Theo trải nghiệm của tác giả thì iPhone 13 vẫn mang lại cho người dùng cảm giác cầm nắm thoải mái và chắc chắn. Ngoài ra thì ở phần mặt sau và mặt trước của iPhone 13 đều được trang bị một lớp kính nhưng chỉ có phần mặt trước của máy sẽ được trang bị lớp bảo vệ Ceramic Shield mà thôi. Cụ thể thì lớp bảo vệ này giúp mặt kính của chiếc iPhone 13 trở nên bền hơn, chống trầy xước và nứt vỡ tốt hơn một chút so với thế hệ tiền nhiệm. Mặc dù vậy thì tác giả nghĩ rằng nếu Apple trang bị công nghệ Ceramic Shield đó ở cả mặt sau của iPhone 13 thì thật sự quá tuyệt vời. Chiếc điện thoại khi đó sẽ được bảo vệ an toàn một cách trọn vẹn nhất. Điều này cũng làm cho người dùng chúng ta cảm thấy yên tâm hơn trong quá trình sử dụng.',
        isSell: true,
        img: ['iphone-13-pro-graphite1', 'iphone-13-pro-graphite2', 'iphone-13-pro-graphite3'],
        color: 'graphite',
        capacity: '128GB'
    },
    {
        productTypeId: 7,
        unitId: 1,
        code: '#1135',
        name: 'iPhone 13 Pro',
        quantity: 10,
        purchasePrice: 20000000,
        price: 27000000,
        shortDescription: 'iPhone 13 Pro',
        description:
            'Xét về phong cách thiết kế, iPhone 13 năm nay vẫn sở hữu khung viền vuông vức giống như trên dòng iPhone 12 trước đó. Theo trải nghiệm của tác giả thì iPhone 13 vẫn mang lại cho người dùng cảm giác cầm nắm thoải mái và chắc chắn. Ngoài ra thì ở phần mặt sau và mặt trước của iPhone 13 đều được trang bị một lớp kính nhưng chỉ có phần mặt trước của máy sẽ được trang bị lớp bảo vệ Ceramic Shield mà thôi. Cụ thể thì lớp bảo vệ này giúp mặt kính của chiếc iPhone 13 trở nên bền hơn, chống trầy xước và nứt vỡ tốt hơn một chút so với thế hệ tiền nhiệm. Mặc dù vậy thì tác giả nghĩ rằng nếu Apple trang bị công nghệ Ceramic Shield đó ở cả mặt sau của iPhone 13 thì thật sự quá tuyệt vời. Chiếc điện thoại khi đó sẽ được bảo vệ an toàn một cách trọn vẹn nhất. Điều này cũng làm cho người dùng chúng ta cảm thấy yên tâm hơn trong quá trình sử dụng.',
        isSell: true,
        img: ['iphone-13-pro-blue1', 'iphone-13-pro-blue2', 'iphone-13-pro-blue3'],
        color: 'blue',
        capacity: '256GB'
    },
    {
        productTypeId: 7,
        unitId: 1,
        code: '#1136',
        name: 'iPhone 13 Pro',
        quantity: 10,
        purchasePrice: 20000000,
        price: 27000000,
        shortDescription: 'iPhone 13 Pro',
        description:
            'Xét về phong cách thiết kế, iPhone 13 năm nay vẫn sở hữu khung viền vuông vức giống như trên dòng iPhone 12 trước đó. Theo trải nghiệm của tác giả thì iPhone 13 vẫn mang lại cho người dùng cảm giác cầm nắm thoải mái và chắc chắn. Ngoài ra thì ở phần mặt sau và mặt trước của iPhone 13 đều được trang bị một lớp kính nhưng chỉ có phần mặt trước của máy sẽ được trang bị lớp bảo vệ Ceramic Shield mà thôi. Cụ thể thì lớp bảo vệ này giúp mặt kính của chiếc iPhone 13 trở nên bền hơn, chống trầy xước và nứt vỡ tốt hơn một chút so với thế hệ tiền nhiệm. Mặc dù vậy thì tác giả nghĩ rằng nếu Apple trang bị công nghệ Ceramic Shield đó ở cả mặt sau của iPhone 13 thì thật sự quá tuyệt vời. Chiếc điện thoại khi đó sẽ được bảo vệ an toàn một cách trọn vẹn nhất. Điều này cũng làm cho người dùng chúng ta cảm thấy yên tâm hơn trong quá trình sử dụng.',
        isSell: true,
        img: ['iphone-13-pro-green1', 'iphone-13-pro-green2', 'iphone-13-pro-green3'],
        color: 'green',
        capacity: '256GB'
    },
    {
        productTypeId: 7,
        unitId: 1,
        code: '#1136',
        name: 'iPhone 13 Pro',
        quantity: 10,
        purchasePrice: 20000000,
        price: 27000000,
        shortDescription: 'iPhone 13 Pro',
        description:
            'Xét về phong cách thiết kế, iPhone 13 năm nay vẫn sở hữu khung viền vuông vức giống như trên dòng iPhone 12 trước đó. Theo trải nghiệm của tác giả thì iPhone 13 vẫn mang lại cho người dùng cảm giác cầm nắm thoải mái và chắc chắn. Ngoài ra thì ở phần mặt sau và mặt trước của iPhone 13 đều được trang bị một lớp kính nhưng chỉ có phần mặt trước của máy sẽ được trang bị lớp bảo vệ Ceramic Shield mà thôi. Cụ thể thì lớp bảo vệ này giúp mặt kính của chiếc iPhone 13 trở nên bền hơn, chống trầy xước và nứt vỡ tốt hơn một chút so với thế hệ tiền nhiệm. Mặc dù vậy thì tác giả nghĩ rằng nếu Apple trang bị công nghệ Ceramic Shield đó ở cả mặt sau của iPhone 13 thì thật sự quá tuyệt vời. Chiếc điện thoại khi đó sẽ được bảo vệ an toàn một cách trọn vẹn nhất. Điều này cũng làm cho người dùng chúng ta cảm thấy yên tâm hơn trong quá trình sử dụng.',
        isSell: true,
        img: ['iphone-13-pro-graphite1', 'iphone-13-pro-graphite2', 'iphone-13-pro-graphite3'],
        color: 'graphite',
        capacity: '256GB'
    },
];

export const productRepositoryController = new ProductRepository();
