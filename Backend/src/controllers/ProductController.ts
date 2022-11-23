import {Response, Request} from 'express';
import { productRepositoryController } from '../databases/repository/ProductRepository';

class ProductController {
    public async getAll(req: Request, res: Response) {
        try {
            const listProduct = await productRepositoryController.getAllProduct();
            if (!listProduct) {
                res.status(500).end('Internal Server Error');
            } else {
                res.status(200).json({
                    success: true,
                    data: listProduct,
                    id: 1
                })
            }
        } catch(err) {
            res.status(500).json({
                success: false,
                message: err.message,
                id: -1,
            });
        }
    }
}

module.exports = new ProductController();