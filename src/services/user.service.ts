import axios, { AxiosResponse } from 'axios';
import userDao from '../models/user.dao';
import { User } from '../interfaces/user.interface';

const signup = async (id: number, email: string): Promise<User> => {
  const newUser: User = await userDao.createUser(id, email);
  return newUser;
};

const kakaoSignin = async (kakaoToken: string) => {
  const getKakaoToken = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      authorization: `Bearer ${kakaoToken}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  if (!getKakaoToken) {
    throw new Error('KAKAO_TOKEN_ERROR');
  }

  const { userData }: any = getKakaoToken;
  console.log(userData);

  const kakaoId = userData.id;
  const name = userData.properties.nickname;
  const email = userData.kakao_account.email;
  // const userId = await userDao.checkUserKakaoId(kakaoId);

  // if (!userId) {
  //   const newUser = await userDao.createUser(email, name, kakaoid);

  //   return jwt.sign({ userId: newUser.insertId }, process.env.SECRET_KEY);
  // }

  // return jwt.sign({ userId: userId }, process.env.SECRET_KEY);
};

export default { signup, kakaoSignin };
