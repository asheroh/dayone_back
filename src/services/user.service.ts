import axios, { AxiosResponse } from 'axios';
import userDao from '../models/user.dao';

const kakaoSignin = async (kakaoToken: string) => {
  const getKakaoInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      authorization: `${kakaoToken}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  const userData: any = getKakaoInfo.data;
  console.log(userData, 'wqewqewq');

  const kakaoId: number = userData.id;
  const nickname: string = userData.properties.nickname;
  const kakaoEmail = userData.kakao_account.email;
  const profileImage: string = userData.properties.thumbnail_image;

  if (!getKakaoInfo) {
    throw new Error('KAKAO_TOKEN_ERROR');
  }

  const newUser = await userDao.checkUserKakaoId(
    kakaoId,
    nickname,
    kakaoEmail,
    profileImage,
  );

  return newUser;
};

export default { kakaoSignin };
