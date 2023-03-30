import { Request, Response } from 'express';
import authService from '../services/auth.service';

class auth {
  async kakaoLoginStart(req: Request, res: Response) {
    const redirectUrl = authService.getKakaoLoginUrl();
    console.log(redirectUrl);
    return res.redirect(redirectUrl);
  }

  async kakaoRedirect(req: Request, res: Response) {
    const kakaoAccessToken = await authService.getKakaoAccessToken(
      req.query.code as string,
    );
    res.header('Access-Control-Allow-Origin', '*');
    res.json({ access_token: kakaoAccessToken });
  }

  async kakaoSignin(req: Request, res: Response) {
    const kakaoToken: any = req.headers.authorization;
    if (!kakaoToken) {
      throw new Error('KAKAO_TOKEN_ERROR');
    }
    const accessToken = await authService.kakaoSignin(kakaoToken);
    res.header('Access-Control-Allow-Origin', '*');
    return res.status(200).json(accessToken);
  }

  async getAllUsers(req: Request, res: Response) {
    const getAllUsers = authService.getAllUsers();
    res.json(getAllUsers);
  }
}

export default new auth();
