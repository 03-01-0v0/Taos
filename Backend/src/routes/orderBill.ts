import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
const router = express.Router();
import orderBillController from '../controllers/OrderBillController';

router.get('/', orderBillController.getAll);
router.get('/statistic', verifyAdmin, orderBillController.getOrderBillStatistic);
router.get('/count-statistic', verifyAdmin, orderBillController.getCountOrderBillStatistic);
router.post('/client', orderBillController.createdOrderBillByClient);
router.post('/', orderBillController.updateOrderBill);
router.delete('/', orderBillController.deleteOrderBill)


export default router;
