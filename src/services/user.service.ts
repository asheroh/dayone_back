import axios from 'axios';
import userDao from '../models/user.dao';

const kakaoSignin = async (kakaoToken: string) => {
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

  const checkUser = await userDao.checkUserInfo(kakaoId);

  if (!checkUser) {
    console.log('DB에 등록되지 않았습니다.');
    const newUser = await userDao.insertKakaoUserInfo(
      kakaoId,
      nickname,
      kakaoEmail,
      profileImage,
    );
    return newUser;
  } else {
    console.log(`Created Successfully Insert Users DB`);
  }
};

export default { kakaoSignin };
