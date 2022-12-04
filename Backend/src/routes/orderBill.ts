import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
import OrderBillController from '../controllers/OrderBillController';
const router = express.Router();

router.get('/', OrderBillController.getAll);

export default router;
