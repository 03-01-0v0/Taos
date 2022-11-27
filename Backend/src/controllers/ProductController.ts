import {Response, Request, NextFunction} from 'express';
import {productRepositoryController} from '../databases/repository/ProductRepository';
import * as path from 'path';
import * as fs from 'fs';

class ProductController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const listProduct = await productRepositoryController.getAllProduct();
            if (!listProduct) {
                res.status(500).end('Internal Server Error');
            } else {
                res.status(200).json({
                    success: true,
                    data: listProduct,
                    id: 1,
                });
            }
        } catch (err) {
            next(err);
        }
    }
    public async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;                                    
            const {
                productTypeId,
                unitId,
                code,
                name,
                img,
                quantity,
                purchasePrice,
                price,
                shortDescription,
                description,
                isSell,
            } = body.params;
            
            // const product = await productRepositoryController.addProduct(
            //     productTypeId,
            //     unitId,
            //     code,
            //     name,
            //     img,
            //     quantity,
            //     purchasePrice,
            //     price,
            //     shortDescription,
            //     description,
            //     isSell
            // );
            res.status(200).end('success');
        } catch (err) {
            next(err);
        }
    }

    public async updateProduct(req, Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    public async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }
}

export default new ProductController();
