import { Repository } from 'typeorm';
import { appDataSource } from '../data-source';
import { OrderStatus } from '../entity/OrderStatus';


class OrderStatusRepository {
    private _orderStatusRepository: Repository<OrderStatus>;
    constructor() {
        this._orderStatusRepository = appDataSource.getRepository(OrderStatus);
    }
    public async updateOrderStatus(orderId: number, statusId: number) {
        const orderStatus = await this._orderStatusRepository.findOneBy({ orderId: orderId });
        orderStatus.statusId = statusId;
        return this._orderStatusRepository.save(orderStatus);
    }
    public async addOrderStatus(orderId: number) {
        const order = new OrderStatus();
        order.orderId = orderId;
        return this._orderStatusRepository.save(order);
    }

}

export const orderStatusRepoController = new OrderStatusRepository();