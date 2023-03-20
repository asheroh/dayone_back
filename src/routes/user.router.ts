import express, { Router } from 'express';
import userController from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/signup', userController.signup);
router.get('/kakao/start', userController.kakaoLogin);
router.get('/kakao/redirect', userController.kakaoRedirect);

export default { router };
