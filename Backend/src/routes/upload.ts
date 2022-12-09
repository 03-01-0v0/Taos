import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { upload } from '..';
import verifyAdmin from '../middleware/verifyAdmin';
const router = express.Router();

router.post('/', upload.single('picture'), (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'OK'
    })
})

// router.post('/multi', verifyAdmin, upload.array('picture', 3), (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).json({
//         success: true,
//         message: 'OK'
//     })
// })

export default router;