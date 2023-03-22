import express, { Router } from 'express';
import postController from '../controllers/post.controller';

const router: Router = express.Router();

router.post('/signup', postController.signup);

export default { router };
