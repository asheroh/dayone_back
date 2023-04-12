import express, { Express } from 'express';
import authRouter from './auth.route';
import postRouter from './post.route';

const router: Express = express();

router.use('/v1', authRouter.router);
router.use('/v1/posts', postRouter.router);

export default router;
