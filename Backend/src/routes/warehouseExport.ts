import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
import WarehouseController from '../controllers/WarehouseExportController';
const router = express.Router();

router.get('/', verifyAdmin, WarehouseController.getAll);
router.post('/', verifyAdmin, WarehouseController.createWarehouseExport);


export default router;
