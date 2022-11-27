import * as express from 'express';
const router = express.Router();
import verifyToken from '../middleware/auth';
const SignOutController = require('../controllers/SignOutController');

router.use('/',verifyToken, SignOutController.signOut);

module.exports = router;
