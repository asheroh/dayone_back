import { Request, Response } from 'express';
import userService from '../services/user.service';

import { User } from '../interfaces/user.interface';

const signup = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.body as User;

    if (!id || !email) {
      return res.status(409).json({ message: 'KEY_ERROR' });
    }

    const newUser = await userService.signup(id, email);
    res
      .status(201)
      .json({ message: 'Created User Successfully', user: newUser });
  } catch (err: any) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const kakaoLogin = async (req: Request, res: Response) => {
  const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
  const KAKAO_REDIRECT_URL = process.env.KAKAO_REDIRECT_URL;
  const KAKAO_REST_APIKEY = process.env.KAKAO_REST_APIKEY;

  const addUrl = `?client_id=${KAKAO_REST_APIKEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
  const finalUrl = baseUrl + addUrl;
  console.log(finalUrl);
  return res.redirect(finalUrl);
};

export default {
  signup,
  kakaoLogin,
};
