import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
import WarehouseController from '../controllers/WarehouseReceiptController';
const router = express.Router();

router.get('/', WarehouseController.getAll);

export default router;
