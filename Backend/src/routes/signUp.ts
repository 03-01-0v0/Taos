import * as express from 'express';
const router = express.Router();
const signUpController = require('../controllers/SignUpController');

router.use('/', signUpController.signUp);

module.exports = router;
