import { Response, Request, NextFunction } from 'express';
import { createError } from '../utils/createError';
import { detailOrderBillController } from '../databases/repository/DetailOrderBillRepo';
import { orderBillRepositoryController } from '../databases/repository/OrderBillRepository';
import { userRepositoryController } from '../databases/repository/UserRepository';
import { productRepositoryController } from '../databases/repository/ProductRepository';
import { orderStatusRepoController } from '../databases/repository/OrderStatusRepository';
interface dataStatistic {
    name: string;
    sum: number;
}

class DetailOrderBillController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const lstOrderBill = await orderBillRepositoryController.getInfoOrderToClient();
            if (!lstOrderBill) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                message: 'OK',
                data: lstOrderBill,
            });
        } catch (err) {
            next(err);
        }
    }

    public async getOrderBillStatistic(req: Request, res: Response, next: NextFunction) {
        try {
            const lstOrderBill = await detailOrderBillController.getDataStatistic();
            if (!lstOrderBill) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                message: 'OK',
                data: lstOrderBill,
            });
        } catch (err) {
            next(err);
        }
    }

    public async getCountOrderBillStatistic(req: Request, res: Response, next: NextFunction) {
        try {
            const lstOrderBill = await detailOrderBillController.getDataCountStatistic();
            if (!lstOrderBill) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                message: 'OK',
                data: lstOrderBill,
            });
        } catch (err) {
            next(err);
        }
    }

    public async createdOrderBill(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const { orderId, userId, productId, paymentId, price, color, quantity, capacity, note } = body.params;
            const findOrderId = await orderBillRepositoryController.getOrderBillById(Number(orderId));
            if (findOrderId) {
                const detailOrderBill = await detailOrderBillController.addDetailOrderBill(findOrderId.id, Number(productId), Number(price), Number(quantity), color, capacity);
                return res.status(201).json({
                    success: true,
                    message: 'CREATED',
                    data: detailOrderBill
                })
            }
            const orderBill = await orderBillRepositoryController.addOrderBill(Number(userId), 1, Number(paymentId), note)
            const detailOrderBill = await detailOrderBillController.addDetailOrderBill(orderBill.id, Number(productId), Number(price), Number(quantity), color, capacity);
            return res.status(201).json({
                success: true,
                message: 'CREATED',
                data: detailOrderBill
            })
        } catch (err) {
            next(createError(500, 'Internal Server Error'));
        }
    }

    public async createdOrderBillByClient(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const { name, email, phoneNumber, address, note, products } = body.params;
            const user = await userRepositoryController.findUserByEmailToCreate(name, email, address, phoneNumber);
            if (!user) {
                return next(createError(500, 'Internal Server Error'));
            }
            const orderBill = await orderBillRepositoryController.addOrderBill(user.id, 1, 1, note);
            if (!orderBill) {
                return next(createError(500, 'Internal Server Error'));
            }
            const orderStatus = await orderStatusRepoController.addOrderStatus(orderBill.id);
            const lstProduct = await detailOrderBillController.addListDetailOrderBill(orderBill.id, products);
            if (!lstProduct) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(201).json({
                success: true,
                message: 'CREATED',
                data: lstProduct
            })
        } catch (err) {
            next(err);
        }
    }

    public async updateOrderBill(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const { id, statusId } = body.params;
            console.log(id, statusId);

            const upd = await orderStatusRepoController.updateOrderStatus(Number(id), Number(statusId));
            if (!upd) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                message: 'UPDATED',
                data: upd
            })
        } catch (err) {
            next(err);
        }
    }

    public async deleteOrderBill(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query;
            const { id } = query;
            const order = await orderBillRepositoryController.removeOrderBill(Number(id));
            if (!order) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                message: 'DELETED',
                data: order
            })
        } catch (err) {
            next(err);
        }
    }

    public async OrderBillByClientWithId(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query;
            const { id } = query;
            const orderBill = await orderBillRepositoryController.getInfoOrderToClientById(Number(id));
            if (!orderBill) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                message: 'OK',
                data: orderBill
            })
        } catch (err) {

        }
    }
}

export default new DetailOrderBillController();
