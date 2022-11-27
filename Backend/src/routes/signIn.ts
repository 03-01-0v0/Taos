import * as express from 'express';
const router = express.Router();
const SignInController = require('../controllers/SignInController');

router.use('/', SignInController.signIn);

export default router;
