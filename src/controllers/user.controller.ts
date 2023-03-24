import { Request, Response } from 'express';
import axios from 'axios';
import userService from '../services/user.service';

const kakaoLoginStart = async (req: Request, res: Response) => {
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
  const kakaoAccessToken = await kakaoAccessTokenReq.json();
  res.json(kakaoAccessToken);
};
/**
 * 가입된 회원인지 체크
 */

const kakaoSignin = async (req: Request, res: Response) => {
  const kakaoToken: any = req.headers.authorization;
  console.log(kakaoToken);

  if (!kakaoToken) {
    throw new Error('KAKAO_TOKEN_ERROR');
  }
  const accessToken = await userService.kakaoSignin(kakaoToken);
  return res.status(200).json(accessToken);
};

export default {
  kakaoLoginStart,
  kakaoRedirect,
  kakaoSignin,
};
