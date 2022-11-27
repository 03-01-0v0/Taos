import * as express from 'express';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyToken from '../middleware/auth';
import verifyPersonalUser from '../middleware/verifyPersonalUser';
import UserController from '../controllers/UserController';
import { upload } from '..';
const router = express.Router();

router.get('/', UserController.getAll);
router.post('/',upload.single('picture'), verifyAdmin, UserController.createUser);
router.put('/', verifyAdmin, UserController.updateUser);
router.delete('/', verifyAdmin, UserController.deleteUser);

/* me */
router.get('/me', [verifyToken, verifyPersonalUser], UserController.getAll);
router.post('/me', [verifyToken, verifyPersonalUser, upload.single('picture')], UserController.updateUser);

export default router;
