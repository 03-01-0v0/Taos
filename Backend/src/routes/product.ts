import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
const router = express.Router();
import productController from '../controllers/ProductController';

router.get('/', productController.getAll);
router.post('/', verifyAdmin, productController.createProduct);
router.put('/', verifyAdmin, productController.updateProduct);
router.delete('/', verifyAdmin, productController.deleteProduct)
router.get('/last', productController.getProductByQuantity);

export default router;
