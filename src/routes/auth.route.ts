import express, { Router } from 'express';
import authController from '../controllers/auth.controller';

const router: Router = express.Router();

router.get('/kakao/start', authController.kakaoLoginStart);
router.get('/kakao/finish', authController.kakaoAuthCode);
router.get('/info', authController.getAllUsers); // 모든 유저의 데이터 가져오기
router.get('/auth/login', authController.getAccessToken); // 카카오 로그인
router.get('/auth/check', authController.isUser)

export default { router };
