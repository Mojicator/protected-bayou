import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/IUser';

const router = Router();

router.get('/user', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'Vamos bien!'
    });
});

export default router;
