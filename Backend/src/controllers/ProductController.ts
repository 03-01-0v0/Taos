import {Response, Request, NextFunction} from 'express';
import {productRepositoryController} from '../databases/repository/ProductRepository';
import {createError} from '../utils/createError';

class ProductController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const listProduct = await productRepositoryController.getAllProduct();
            if (!listProduct) {
                return next(createError(500, 'Internal Server Error'));
            }
            res.status(200).json({
                success: true,
                message: 'OK',
                data: listProduct,
            });
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
            const product = await productRepositoryController.addProduct(
                productTypeId,
                unitId,
                code,
                name,
                img,
                Number(quantity),
                Number(purchasePrice),
                Number(price),
                shortDescription,
                description,
                isSell
            );
            res.status(201).json({
                success: true,
                message: 'CREATED',
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }

    public async updateProduct(req, Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const {
                id,
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
            const listImg = img.split(' ');
            const product = await productRepositoryController.updateProduct(
                id,
                productTypeId,
                unitId,
                code,
                name,
                listImg,
                quantity,
                purchasePrice,
                price,
                shortDescription,
                description,
                isSell
            );
            res.status(201).json({
                success: true,
                message: 'UPDATED',
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }

    public async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const {id} = body.params;
            const product = await productRepositoryController.removeProduct(id);
            res.status(200).json({
                success: true,
                message: 'DELETED',
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }

    public async getProductByQuantity(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query;
            const quantity = query.count as string?? "";
            console.log('quantity', quantity);
            let count = 5;
            try {
                count = parseInt(quantity ?? "5");
            } catch(err) {
                next(err);
            }
            const lstProduct = await productRepositoryController.getProductByQuantity(count);
            res.status(200).json({
                success: true,
                message: 'OK',
                data: lstProduct,
            });
        } catch(err) {
            next(err);
        }
    }
}

export default new ProductController();
