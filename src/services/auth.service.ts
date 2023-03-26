import axios from 'axios';
import authDao from '../models/auth.dao';

class AuthService {
  getKakaoLoginUrl() {
    const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
    const KAKAO_REDIRECT_URL = process.env.KAKAO_REDIRECT_URL;
    const KAKAO_REST_APIKEY = process.env.KAKAO_REST_APIKEY;

    const addUrl = `?client_id=${KAKAO_REST_APIKEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
    const finalUrl = baseUrl + addUrl;
    return finalUrl;
  }

  async getKakaoAccessToken(code: string) {
    const baseUrl = `https://kauth.kakao.com/oauth/token`;
    const redirectConfig = {
      client_id: process.env.KAKAO_REST_APIKEY,
      client_secret: process.env.KAKAO_CLIENT_SECRET_KEY,
      redirect_uri: process.env.KAKAO_REDIRECT_URL,
      grant_type: 'authorization_code',
      code: code,
    };
    const configUrl = `?client_id=${redirectConfig.client_id}&client_secret=${redirectConfig.client_secret}&redirect_uri=${redirectConfig.redirect_uri}&grant_type=${redirectConfig.grant_type}&code=${redirectConfig.code}`;
    const fullUrlQuery = baseUrl + configUrl;
    const kakaoAccessTokenReq = await axios.post(fullUrlQuery);
    const kakaoAccessToken = await kakaoAccessTokenReq.data;
    return kakaoAccessToken;
  }

  async kakaoSignin(kakaoToken: string) {
    const getKakaoInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        authorization: `${kakaoToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    if (!getKakaoInfo) {
      throw new Error('KAKAO_TOKEN_ERROR');
    }

    const userData: any = getKakaoInfo.data;
    const kakaoId: number = userData.id;
    const nickname: string = userData.properties.nickname;
    const kakaoEmail: string = userData.kakao_account.email;
    const profileImage: string = userData.properties.thumbnail_image;

    const checkUser = await authDao.checkUserInfo(kakaoId);

    if (!checkUser) {
      console.log('DB에 등록되지 않았습니다.');
      const newUser = await authDao.insertKakaoUserInfo(
        kakaoId,
        nickname,
        kakaoEmail,
        profileImage,
      );
      console.log(`Created Successfully Insert Users DB`);

      return newUser;
    }
    console.log(`user login successsfully!`);
  }
}

export default new AuthService();
