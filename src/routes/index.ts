import express, { Express } from 'express';
import userRouter from './user.router';

const router: Express = express();

router.use('/users', userRouter.router);

export default router;
