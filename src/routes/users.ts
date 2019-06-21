import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'underscore';
import User, { IUser } from '../models/IUser';
import { ObjectID } from 'bson';

const router: Router = Router();

const ROUNDS: number = 10;
//TODO: Integracion de middlewares
router.get('/users', (req: Request, res: Response) => {
    User.find({ state: true })
        .exec((err: any, users: IUser[]) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.countDocuments({ state: true }, (err: any, online: number) => {
                res.json({
                    ok: true,
                    total: online,
                    users
                });
            });
        });
});

router.post('/user', function(req: Request, res: Response) {
    let body = req.body;
    let user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, ROUNDS)
    });

    user.save((err: any, userDB: IUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            user: userDB
        });
    });
});

router.put('/user/:id', function(req: Request, res: Response) {
    let id: ObjectID = req.params.id;
    let validFields: string[] = ['firstName', 'lastName', 'img'];
    let body = _.pick(req.body, validFields);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err: any, userDB: IUser | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            user: userDB
        });
    });
});

router.delete('/bye-user/:id', function(req: Request, res: Response) {
    let _id: ObjectID = req.params.id;

    User.findByIdAndUpdate(_id, { state: false }, { new: true }, (err: any, user: IUser | null) => {
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }

        return res.json({
            ok: true,
            user
        });
    });
});

router.delete('/good-bye-user/:id', function(req: Request, res: Response) {
    let id: ObjectID = req.params.id;

    User.findByIdAndRemove(id, (err: any, user: IUser | null) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found.'
                }
            });
        }

        return res.json({
            ok: true,
            user
        });
    });
});

export default router;
