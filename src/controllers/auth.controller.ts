import { Request, Response } from 'express';
import authService from '../services/auth.service';

class auth {
  async kakaoLoginStart(req: Request, res: Response) {
    const redirectUrl = authService.getKakaoLoginUrl();
    console.log(redirectUrl);
    res.header('Access-Control-Allow-Origin', '*');
    return res.redirect(redirectUrl);
  }

  async getKakakoAuthorize(req: Request, res: Response) {
    const kakaoCode = req.query.code;
    console.log(kakaoCode);

    return kakaoCode;
  }

  async kakaoRedirect(req: Request, res: Response) {
    const kakaoAccessToken = await authService.getKakaoAccessToken(
      req.headers.authorization as string,
    );

    const kakaoToken: any = req.headers.authorization;
    if (!kakaoToken) {
      throw new Error('KAKAO_TOKEN_ERROR');
    }
    const accessToken = await authService.kakaoSignin(kakaoToken);
    return res.status(200).json({ accessToken: accessToken });
  }

  async getAllUsers(req: Request, res: Response) {
    const getAllUsers = authService.getAllUsers();
    res.header('Access-Control-Allow-Origin', '*');

    res.json(getAllUsers);
  }
}

export default new auth();
