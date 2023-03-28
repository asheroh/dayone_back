import express, { Router } from 'express';
import postController from '../controllers/post.controller';

const router: Router = express.Router();

router.post('/', postController.dayPosting);
router.get('/search/', postController.getBookTitle);

router.get('/', postController.getAllPosts);
router.get('/', postController.getBookTitle);
router.get('/:userId', postController.getUserPosts);

export default { router };
