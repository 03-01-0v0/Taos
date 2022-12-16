import { Repository } from 'typeorm';
import { OrderBill } from '../entity/OrderBill';
import { User } from '../entity/User';
import { Payments } from '../entity/Payments';
import { Sale } from '../entity/Sale';
import { DetailOrderBill } from '../entity/DetailOrderBill';
import { Product } from '../entity/Product';
import { appDataSource } from '../data-source';

class OrderBillRepository {
    private _orderBillRepository: Repository<OrderBill>;
    private _userRepository: Repository<User>;
    private _paymentRepository: Repository<Payments>;
    private _saleRepository: Repository<Sale>;
    private _detailOrderRepository: Repository<DetailOrderBill>;
    private _productRepository: Repository<Product>;

    constructor() {
        this._orderBillRepository = appDataSource.getRepository(OrderBill);
        this._userRepository = appDataSource.getRepository(User);
        this._paymentRepository = appDataSource.getRepository(Payments);
        this._saleRepository = appDataSource.getRepository(Sale);
        this._detailOrderRepository = appDataSource.getRepository(DetailOrderBill);
        this._productRepository = appDataSource.getRepository(Product);
    }

    public async getAllOrderBill(): Promise<OrderBill[]> {
        return this._orderBillRepository.find();
    }

    public async getOrderBillById(id: number): Promise<OrderBill> {
        return this._orderBillRepository.findOneBy({ id });
    }

    public setOrderBill(
        userId: number,
        paymentId: number,
        saleId: number,
        note: string,
        orderBill: OrderBill
    ): OrderBill {
        orderBill.userId = userId;
        orderBill.paymentId = paymentId;
        orderBill.saleId = saleId;
        orderBill.note = note;
        return orderBill;
    }

    public async addOrderBill(
        userId: number,
        paymentId: number,
        saleId: number,
        note: string
    ): Promise<OrderBill> {
        const user: User = await this._userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error(`Cant find user with id: ${userId}`);
        }
        const payment: Payments = await this._paymentRepository.findOneBy({ id: paymentId });
        if (!payment) {
            throw new Error(`Cant find payment with id: ${paymentId}`);
        }
        const sale: Sale = await this._saleRepository.findOneBy({ id: saleId });
        if (!sale) {
            throw new Error(`Cant find sale with id: ${saleId}`);
        }
        const orderBill = new OrderBill();
        this.setOrderBill(userId, paymentId, saleId, note, orderBill);
        return this.saveOrderBill(orderBill);
    }

    public async updateOrderBill(
        id: number,
        userId: number,
        paymentId: number,
        saleId: number,
        note: string
    ): Promise<OrderBill> {
        const user: User = await this._userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error(`Cant find user with id: ${userId}`);
        }
        const payment: Payments = await this._paymentRepository.findOneBy({ id: paymentId });
        if (!payment) {
            throw new Error(`Cant find payment with id: ${paymentId}`);
        }
        const sale: Sale = await this._saleRepository.findOneBy({ id: saleId });
        if (!sale) {
            throw new Error(`Cant find sale with id: ${saleId}`);
        }
        const orderBill = await this._orderBillRepository.findOneBy({ id });
        if (!orderBill) {
            throw new Error(`Cant find orderBill with id: ${id}`);
        }
        this.setOrderBill(userId, paymentId, saleId, note, orderBill);
        return this.saveOrderBill(orderBill);
    }

    public async removeOrderBill(id: number): Promise<OrderBill> {
        const orderBill = await this._orderBillRepository.findOneBy({ id });
        if (!orderBill) {
            throw new Error(`Cant find orderBill with id: ${id}`);
        }
        return this._orderBillRepository.remove(orderBill);
    }

    public async saveOrderBill(orderBill: OrderBill): Promise<OrderBill> {
        if (orderBill) {
            return this._orderBillRepository.save(orderBill);
        }
        return null;
    }

    public async getInfoOrderToClient() {
        const orderUser = await this._orderBillRepository.query(`SELECT order_user.id,
        "userId",
        "paymentId",
        "saleId",
        note,
        "name",
        address,
        email,
        "phoneNumber",
        order_user."createdDate",
        order_user."updatedDate",
        "statusId"
        FROM public.order_user left join order_status on order_user."id" = order_status."orderId" order by  order_user."createdDate" DESC;`);
        const detailOrder = await this._detailOrderRepository.find();
        const products = await this._productRepository.find();
        const res = orderUser.map(e => {
            const fill = detailOrder.filter(detail => detail.orderId === e.id);
            const fillPro = fill.map(e => {
                const product = products.find(product => product.id = e.productId);
                return {
                    ...e,
                    name: product.name
                }
            })
            return {
                ...e,
                products: fillPro
            }
        })
        return res;
    }

    public async getInfoOrderToClientById(id: number) {
        const orderUser = await this._orderBillRepository.query(`SELECT order_user.id,
        "userId",
        "paymentId",
        "saleId",
        note,
        "name",
        address,
        email,
        "phoneNumber",
        order_user."createdDate",
        order_user."updatedDate",
        order_status."statusId"
        FROM public.order_user left join order_status on order_user."id" = order_status."orderId" where order_user."id"=${id} order by  order_user."createdDate" DESC;`);
        const detailOrder = await this._detailOrderRepository.find();
        const products = await this._productRepository.find();
        const res = orderUser.map(e => {
            const fill = detailOrder.filter(detail => detail.orderId === e.id);
            const fillPro = fill.map(e => {
                const product = products.find(product => product.id = e.productId);
                return {
                    ...e,
                    name: product.name
                }
            })
            return {
                ...e,
                products: fillPro
            }
        })
        return res;
    }
}

export const orderBillRepositoryController = new OrderBillRepository();
