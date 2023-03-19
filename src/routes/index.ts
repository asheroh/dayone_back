import express, { Express, Router } from 'express';
import userRouter from './user.router';

const router: Express = express();

router.use('/', userRouter);

export default router;
