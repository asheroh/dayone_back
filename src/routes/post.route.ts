import express, { Router } from 'express';
import postController from '../controllers/post.controller';
import auth from '../middlewares/auth';

const router: Router = express.Router();

router.post('/', auth.validateToken, postController.dayPosting); // 데이기록 작성
router.get('/all', auth.validateToken, postController.getAllPosts); // 전체 유저들의 기록 가져오기
router.get('/search/', auth.validateToken, postController.getBookTitle); // 네이버 책 검색 API 리다이렉트 URI
router.get('/', auth.validateToken, postController.getBookTitle); // 네이버 책 API
router.get('/:userId', auth.validateToken, postController.getUserPosts); // 해당 유저의 기록 가져오기

export default { router };
