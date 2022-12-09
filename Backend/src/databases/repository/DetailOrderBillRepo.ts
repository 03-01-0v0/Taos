import {Repository} from 'typeorm';
import {DetailOrderBill} from '../entity/DetailOrderBill';
import {OrderBill} from '../entity/OrderBill';
import {Product} from '../entity/Product';
import {appDataSource} from '../data-source';

class DetailOrderBillRepo {
    private _detailOrderBillRepo: Repository<DetailOrderBill>;
    private _orderBillRepo: Repository<OrderBill>;
    private productRepository: Repository<Product>;

    constructor() {
        this._detailOrderBillRepo = appDataSource.getRepository(DetailOrderBill);
        this._orderBillRepo = appDataSource.getRepository(OrderBill);
        this.productRepository = appDataSource.getRepository(Product);
    }

    public async getAllDetailOrderBill(): Promise<DetailOrderBill[]> {
        return this._detailOrderBillRepo
            .query(`SELECT detail_order_bill.id, product.name, order_status."statusId", detail_order_bill."orderId", "productId", detail_order_bill.price, detail_order_bill.quantity, detail_order_bill.color, detail_order_bill.capacity
        FROM public.detail_order_bill left join order_status on detail_order_bill."orderId" = order_status."orderId" left join product on "productId" = product.id;`);
    }

    public async getDataStatistic(): Promise<DetailOrderBill[]> {
        return this._detailOrderBillRepo.query(`SELECT product.name, sum(detail_order_bill.quantity * detail_order_bill.price)
        FROM public.detail_order_bill left join product on "productId" = product.id group by product.name;`);
    }

    public async getDataCountStatistic(): Promise<DetailOrderBill[]> {
        return this._detailOrderBillRepo.query(`SELECT product.name, sum(detail_order_bill.quantity)
        FROM public.detail_order_bill left join product on "productId" = product.id group by product.name;`);
    }

    public async getDetailOrderBillById(id: number): Promise<DetailOrderBill> {
        return this._detailOrderBillRepo.findOneBy({id});
    }

    public setDetailOrderBill(
        orderId: number,
        productId: number,
        price: number,
        quantity: number,
        color: string,
        capacity: string,
        detailOrderBill: DetailOrderBill
    ): DetailOrderBill {
        detailOrderBill.orderId = orderId;
        detailOrderBill.productId = productId;
        detailOrderBill.price = price;
        detailOrderBill.capacity = capacity;
        detailOrderBill.quantity = quantity;
        detailOrderBill.color = color;
        return detailOrderBill;
    }

    public async addDetailOrderBill(
        orderId: number,
        productId: number,
        price: number,
        quantity: number,
        color: string,
        capacity: string
    ): Promise<DetailOrderBill> {
        const order = await this._orderBillRepo.findOneBy({id: orderId});
        if (!order) {
            throw new Error(`Cant find order with id: ${orderId}`);
        }
        const product: Product = await this.productRepository.findOneBy({id: productId});
        if (!product) {
            throw new Error(`Cant find product with id: ${productId}`);
        }
        const detailOrderBill = new DetailOrderBill();
        this.setDetailOrderBill(
            orderId,
            productId,
            price,
            quantity,
            color,
            capacity,
            detailOrderBill
        );
        return this.saveDetailOrderBill(detailOrderBill);
    }

    public async updateDetailOrderBill(
        id: number,
        orderId: number,
        productId: number,
        price: number,
        quantity: number,
        color: string,
        capacity: string
    ) {
        const detailOrderBill = await this._detailOrderBillRepo.findOneBy({id});
        if (!detailOrderBill) {
            throw new Error(`Cant find detailOrderBill with id: ${id}`);
        }
        this.setDetailOrderBill(
            orderId,
            productId,
            price,
            quantity,
            color,
            capacity,
            detailOrderBill
        );
        return this.saveDetailOrderBill(detailOrderBill);
    }

    public async removeDetailOrderBill(id: number): Promise<DetailOrderBill> {
        const detailOrderBill = await this._detailOrderBillRepo.findOneBy({id});
        if (!detailOrderBill) {
            throw new Error(`Cant find detailOrderBill with id: ${id}`);
        }
        return this._detailOrderBillRepo.remove(detailOrderBill);
    }

    public async saveDetailOrderBill(detailOrderBill: DetailOrderBill): Promise<DetailOrderBill> {
        if (detailOrderBill) {
            return this._detailOrderBillRepo.save(detailOrderBill);
        }
        return null;
    }
}

export const detailOrderBillController = new DetailOrderBillRepo();
