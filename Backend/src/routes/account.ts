import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
import AccountController from '../controllers/AccountController';
const router = express.Router();

router.get('/', AccountController.getAll);
router.post('/', verifyAdmin, AccountController.createAccount);
router.put('/', verifyAdmin, AccountController.updateAccount);
router.delete('/', verifyAdmin, AccountController.deleteAccount);

export default router;
