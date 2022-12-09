import {Repository} from 'typeorm';
import {OrderBill} from '../entity/OrderBill';
import {User} from '../entity/User';
import {Payments} from '../entity/Payments';
import {Sale} from '../entity/Sale';
import {appDataSource} from '../data-source';

class OrderBillRepository {
    private _orderBillRepository: Repository<OrderBill>;
    private _userRepository: Repository<User>;
    private _paymentRepository: Repository<Payments>;
    private _saleRepository: Repository<Sale>;

    constructor() {
        this._orderBillRepository = appDataSource.getRepository(OrderBill);
        this._userRepository = appDataSource.getRepository(User);
        this._paymentRepository = appDataSource.getRepository(Payments);
        this._saleRepository = appDataSource.getRepository(Sale);
    }

    public async getAllOrderBill(): Promise<OrderBill[]> {
        return this._orderBillRepository.find();
    }

    public async getOrderBillById(id: number): Promise<OrderBill> {
        return this._orderBillRepository.findOneBy({id});
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
        saleId: number = 1,
        note: string
    ): Promise<OrderBill> {
        const user: User = await this._userRepository.findOneBy({id: userId});
        if (!user) {
            throw new Error(`Cant find user with id: ${userId}`);
        }
        const payment: Payments = await this._paymentRepository.findOneBy({id: paymentId});
        if (!payment) {
            throw new Error(`Cant find payment with id: ${paymentId}`);
        }
        const sale: Sale = await this._saleRepository.findOneBy({id: saleId});
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
        const user: User = await this._userRepository.findOneBy({id: userId});
        if (!user) {
            throw new Error(`Cant find user with id: ${userId}`);
        }
        const payment: Payments = await this._paymentRepository.findOneBy({id: paymentId});
        if (!payment) {
            throw new Error(`Cant find payment with id: ${paymentId}`);
        }
        const sale: Sale = await this._saleRepository.findOneBy({id: saleId});
        if (!sale) {
            throw new Error(`Cant find sale with id: ${saleId}`);
        }
        const orderBill = await this._orderBillRepository.findOneBy({id});
        if (!orderBill) {
            throw new Error(`Cant find orderBill with id: ${id}`);
        }
        this.setOrderBill(userId, paymentId, saleId, note, orderBill);
        return this.saveOrderBill(orderBill);
    }

    public async removeOrderBill(id: number): Promise<OrderBill> {
        const orderBill = await this._orderBillRepository.findOneBy({id});
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
}

export const orderBillRepositoryController = new OrderBillRepository();
