import express, { Router } from 'express';
import postController from '../controllers/post.controller';
import auth from '../middlewares/auth';

const router: Router = express.Router();

router.post('/', postController.createPost); // 데이기록 작성
router.get('/all', postController.getAllPosts); // 전체 유저들의 기록 가져오기

router.get('/search/book', postController.getBookTitle); // 네이버 책 검색 API 리다이렉트 URI
router.get('/', postController.getBookTitle); // 네이버 책 API

router.get('/user/:userId', postController.getUserPosts); // 해당 유저의 기록 가져오기

// router.put('/:postId',  postController.updatePostById);

router.delete('/:postId', postController.deletePostById);

export default { router };
