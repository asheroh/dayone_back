import express, { Express } from 'express';
import authRouter from './auth.route';
import postRouter from './post.route';

const router: Express = express();

router.use('/', authRouter.router);
router.use('/posts', postRouter.router);

export default router;
