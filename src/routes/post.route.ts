import express, { Router } from 'express';
import postController from '../controllers/post.controller';
import auth from '../middlewares/auth';

const router: Router = express.Router();


router.post('/', auth.validateToken, postController.createPost);
router.get('/', auth.validateToken, postController.getAllPosts);
// router.get('/best', postController.getBestPosts);

// 좋아요
router.post('/like', postController.addPostLike);
router.delete('/:postId/like', postController.deletePostLike);
// router.delete('/:postId/like', postController.deletePostLike);

router.get('/search/book', auth.validateToken, postController.getBookTitle); // 네이버 책 검색 API 리다이렉트 URI
router.get('/', auth.validateToken, postController.getBookTitle); // 네이버 책 API

router.get('/user/:userId', auth.validateToken, postController.getUserPosts); // 해당 유저의 기록 가져오기

// router.put('/:postId',  postController.updatePostById);
router.delete('/:postId', auth.validateToken, postController.deletePostById);

export default { router };
