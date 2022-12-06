import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
import WarehouseController from '../controllers/WarehouseExportController';
const router = express.Router();

router.get('/', WarehouseController.getAll);

export default router;
