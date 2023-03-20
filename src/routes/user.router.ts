import express, { Router } from 'express';
import userController from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/signup', userController.signup);

export default { router };
