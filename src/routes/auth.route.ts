import express, { Router } from 'express';
import authController from '../controllers/auth.controller';

const router: Router = express.Router();

router.get('/info', authController.getAllUsers);
router.get('/kakao/start', authController.kakaoLoginStart);
router.get('/users/kakao/finish', authController.kakaoRedirect);
router.get('/api/v1/auth/login', authController.kakaoSignin);

export default { router };
