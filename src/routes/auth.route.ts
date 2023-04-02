import express, { Router } from 'express';
import authController from '../controllers/auth.controller';
import auth from '../middlewares/auth';

const router: Router = express.Router();

router.get('/info', authController.getAllUsers); // 모든 유저의 데이터 가져오기
router.get('/kakao/start', authController.kakaoLoginStart); // 카카오 로그인 버튼 눌렀을 때, 리다이렉트 URI
router.get('/kakao/finish', authController.kakaoRedirect);

// router.get('/api/v1/auth/login', authController.kakaoSignin); // 카카오 로그인

export default { router };
