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

const kakaoRedirect = async (req: Request, res: Response) => {
  const baseUrl = `https://kauth.kakao.com/oauth/token`;
  const redirectConfig = {
    client_id: process.env.KAKAO_REST_APIKEY,
    client_secret: process.env.KAKAO_CLIENT_SECRET_KEY,
    redirect_uri: process.env.KAKAO_REDIRECT_URL,
    grant_type: 'authorization_code',
    code: req.query.code,
  };
  const configUrl = `?client_id=${redirectConfig.client_id}&client_secret=${redirectConfig.client_secret}&redirect_uri=${redirectConfig.redirect_uri}&grant_type=${redirectConfig.grant_type}&code=${redirectConfig.code}`;
  const fullUrlQuery = baseUrl + configUrl;
  const kakaoAccessTokenReq = await fetch(fullUrlQuery, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const json = await kakaoAccessTokenReq.json();
  console.log(json);
  res.send(JSON.stringify(json)); // 프론트엔드에서 확인하려고
};
export default {
  signup,
  kakaoLogin,
  kakaoRedirect,
};
