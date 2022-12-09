import {Response, Request, NextFunction} from 'express';
import {createError} from '../utils/createError';
import { detailWareHouseReceiptController } from '../databases/repository/DetailWarehouseReceiptRepo';
import { warehouseReceiptRepositoryController } from '../databases/repository/WarehouseReceiptRepository';
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

    public async createdWarehouseReceipt(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const { creatorId, warehouseReceiptId, productId, color, quantity, capacity, note} = body.params;
            const findWarehouseReceipt = await warehouseReceiptRepositoryController.getWarehouseReceiptById(Number(warehouseReceiptId));
            if (!findWarehouseReceipt) {
                const warehouseReceipt = await warehouseReceiptRepositoryController.addWarehouseReceipt(creatorId, note);
                const detailWarehouseReceipt = await detailWareHouseReceiptController.addDetailWareHouseReceipt(warehouseReceipt.id, Number(productId), Number(quantity), color, capacity);
                res.status(201).json({
                    success: true,
                    message: 'CREATED',
                    data: detailWarehouseReceipt
                })
            }
            const detailWarehouseReceipt = await detailWareHouseReceiptController.addDetailWareHouseReceipt(Number(warehouseReceiptId), Number(productId), Number(quantity), color, capacity);
            res.status(201).json({
                success: true,
                message: 'CREATED',
                data: detailWarehouseReceipt
            })
        } catch (err) {
            next(err);
        }
    }
}

export default new DetailWareHouseReceiptController();
