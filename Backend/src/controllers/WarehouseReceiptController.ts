import {Response, Request, NextFunction} from 'express';
import {createError} from '../utils/createError';
import { detailWareHouseReceiptController } from '../databases/repository/DetailWarehouseReceiptRepo';

class DetailWareHouseReceiptController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const lstWarehouseReceipt = await detailWareHouseReceiptController.getAllDetailWareHouseReceipt();
            if (!lstWarehouseReceipt) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                message: 'OK',
                data: lstWarehouseReceipt,
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new DetailWareHouseReceiptController();
