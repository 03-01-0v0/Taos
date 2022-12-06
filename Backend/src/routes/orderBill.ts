import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
const router = express.Router();
import orderBillController from '../controllers/OrderBillController';

router.get('/',  orderBillController.getAll);

export default router;
