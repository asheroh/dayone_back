import express, { Express } from 'express';
import userRouter from './user.router';
import postRouter from './post.router';

const router: Express = express();

router.use('/users', userRouter.router);
router.use('/', userRouter.router);
router.use('/posts', postRouter.router);

export default router;
