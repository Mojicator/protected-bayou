import {Router, Request, Response} from 'express';


const router = Router();

//TODO: Terminar con los requests y realizar pruebas
router.post('/login', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'Todo funcionando hasta ahora...'
    });
});



export default router;