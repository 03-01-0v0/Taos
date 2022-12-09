import {Response, Request, NextFunction} from 'express';
import {createError} from '../utils/createError';
import {detailOrderBillController} from '../databases/repository/DetailOrderBillRepo';
import { orderBillRepositoryController } from '../databases/repository/OrderBillRepository';
interface dataStatistic {
    name: string;
    sum: number;
}

class DetailOrderBillController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const lstOrderBill = await detailOrderBillController.getAllDetailOrderBill();          
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
        } catch(err) {
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
        } catch(err) {
            next(err);
        }
    }

    public async createdOrderBill(req: Request, res: Response, next: NextFunction) {
        try{
            const body = req.body;
            const {orderId, userId, productId, paymentId, price, color, quantity, capacity, note} = body.params;
            const findOrderId = await orderBillRepositoryController.getOrderBillById(Number(orderId));
            if (findOrderId) {
                const detailOrderBill = await detailOrderBillController.addDetailOrderBill(findOrderId.id, Number(productId), Number(price),Number(quantity), color, capacity);
                return res.status(201).json({
                    success: true,
                    message: 'CREATED',
                    data: detailOrderBill
                })
            }
            const orderBill = await orderBillRepositoryController.addOrderBill(Number(userId), 1, Number(paymentId), note)
            const detailOrderBill = await detailOrderBillController.addDetailOrderBill(orderBill.id, Number(productId), Number(price),Number(quantity), color, capacity);
            return res.status(201).json({
                success: true,
                message: 'CREATED',
                data: detailOrderBill
            })
        } catch(err) {
            next(createError(500, 'Internal Server Error'));
        }
    }
}

export default new DetailOrderBillController();
