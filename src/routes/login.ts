import {Router, Request, Response} from 'express';
import User, { IUser } from "../models/IUser";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SEED, EXT } from '../config/config';

const router = Router();

//TODO: Realizar validaciones y pruebas
router.post('/login', (req: Request, res: Response) => {
    let body: any = req.body;
    
    User.findOne({ email: body.email }, (err: any, fulano: IUser) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!fulano) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Either Email or Password are incorrect. Please, try again...'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, fulano.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Either Email of Password are incorrect. Please, try again...'
                }
            });
        }

        let token = jwt.sign({ user: fulano }, SEED, { expiresIn: EXT });

        return res.json({
            ok: true,
            user: fulano,
            token
        });
    });
});



export default router;