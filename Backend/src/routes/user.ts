import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';
import UserController from '../controllers/UserController';
const router = express.Router();

router.get('/', UserController.getAll);
router.post('/', verifyAdmin, UserController.createUser);
router.put('/', verifyAdmin, UserController.updateUser);
router.delete('/', verifyAdmin, UserController.deleteUser);
router.post('/personal-user', verifyToken, UserController.updateUser);

export default router;
