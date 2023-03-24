import express, { Router } from 'express';
import userController from '../controllers/user.controller';

const router: Router = express.Router();

// router.post('/signup', userController.signup);
router.get('/kakao/start', userController.kakaoLoginStart);
router.get('/users/kakao/finish', userController.kakaoRedirect);
router.get('/api/v1/auth/login', userController.kakaoSignin);

export default { router };
