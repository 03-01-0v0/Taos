import {Response, Request, NextFunction} from 'express';
import {createError} from '../utils/createError';
import { detailWarehouseExportController } from '../databases/repository/DetailWarehouseExportRepo';
import { warehouseExportRepositoryController } from '../databases/repository/WarehouseExportRepository';

class DetailWareHouseExportController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const lstWarehouseExport = await detailWarehouseExportController.getAllDetailWarehouseExport();
            if (!lstWarehouseExport) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                message: 'OK',
                data: lstWarehouseExport,
            });
        } catch (err) {
            next(err);
        }
    }

    public async createWarehouseExport(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const {creatorId, receiptId, warehouseExportId, productId, capacity, color, quantity, note} = body.params;
            const findWarehouseExport = await warehouseExportRepositoryController.getWarehouseExportById(Number(warehouseExportId));
            if (!findWarehouseExport) {                
                const warehouseExport = await warehouseExportRepositoryController.addWarehouseExport(Number(creatorId), Number(receiptId), note);                
                if (!warehouseExport) {
                    return next(createError(500, 'Internal Server Error'));
                }
                const detailWarehouseExport = await detailWarehouseExportController.addDetailWarehouseExport(warehouseExport.id, Number(productId) ,Number(quantity), color, capacity);
                console.log(detailWarehouseExport);
                
                if (!detailWarehouseExport) {
                    return next(createError(500, 'Internal Server Error'));
                }
                res.status(201).json({
                    success: true, 
                    message: 'CREATED',
                    data: detailWarehouseExport
                });
            } else {
                const detailWarehouseExport = await detailWarehouseExportController.addDetailWarehouseExport(findWarehouseExport.id, Number(productId) ,Number(quantity), color, capacity);
                if (!detailWarehouseExport) {
                    return next(createError(500, 'Internal Server Error'));
                }
                res.status(201).json({
                    success: true, 
                    message: 'CREATED',
                    data: detailWarehouseExport
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

export default new DetailWareHouseExportController();
