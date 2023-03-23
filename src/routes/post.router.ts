import express, { Router } from 'express';
import postController from '../controllers/post.controller';

const router: Router = express.Router();
//
router.post('/', postController.dayPosting);
router.get('/:userId', postController.getUserPosts);

export default { router };
