import * as express from 'express';
const router = express.Router();
const productController = require('../controllers/ProductController');

router.use('/', productController.getAll);

module.exports = router;
