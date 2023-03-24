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

  const kakaoId: number = userData.id;
  const nickname: string = userData.properties['nickname'];
  const kakaoEmail = 'kakaotest.com';
  const profileImage: string = userData.properties['thumbnail_image_url'];

  console.log('!@3213', kakaoId, nickname, kakaoEmail, profileImage);

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
  //   return jwt.sign({ userId: newUser.insertId }, process.env.SECRET_KEY);
  // }

  // return jwt.sign({ userId: userId }, process.env.SECRET_KEY);
};
// };

export default { kakaoSignin };
