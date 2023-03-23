import express, { Router } from 'express';
import postController from '../controllers/post.controller';

const router: Router = express.Router();

router.post('/', postController.dayPosting);

export default { router };
