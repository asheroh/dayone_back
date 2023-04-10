import { Request, Response } from 'express';
import authService from '../services/auth.service';

class auth {
  // 백엔드 테스트
  async kakaoLoginStart(req: Request, res: Response) {
    const redirectUrl = authService.getKakaoLoginUrl();
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  }
  // 백엔드 테스트
  async kakaoAuthCode(req: Request, res: Response) {
    const kakaoAuthCode = req.query.code;
    res.json({ kakaoAuthCode: kakaoAuthCode });
  }

  async getAccessToken(req: Request, res: Response) {
    const kakaoCode: any = req.headers.authorization?.split(' ')[1];

    const kakaoTokenResponse = await authService.getKakaoAccessToken(kakaoCode);
    const kakaoAccessToken = kakaoTokenResponse.access_token as string;

    if (!kakaoAccessToken) {
      throw new Error('KAKAO_TOKEN_ERROR');
    }

    const accessToken = await authService.kakaoSignin(kakaoAccessToken);
    console.log(accessToken);

    // Set the access token as a cookie

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 86400 * 1000, // 1 day in milliseconds
      })
      .json({ cookie: accessToken });
  }

  async getAllUsers(req: Request, res: Response) {
    const getAllUsers = authService.getAllUsers();
    res.header('Access-Control-Allow-Origin', '*');
    res.json(getAllUsers);
  }
}

export default new auth();
