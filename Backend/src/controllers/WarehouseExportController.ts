import {Response, Request, NextFunction} from 'express';
import {createError} from '../utils/createError';
import { detailWarehouseExportController } from '../databases/repository/DetailWarehouseExportRepo';

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
}

export default new DetailWareHouseExportController();
