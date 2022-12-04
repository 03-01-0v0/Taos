import {Response, Request, NextFunction} from 'express';
import {createError} from '../utils/createError';
import {detailOrderBillController} from '../databases/repository/DetailOrderBillRepo';

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
}

export default new DetailOrderBillController();
