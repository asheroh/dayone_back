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

    const kakaoToken: any = kakaoAccessToken.access_token;

    if (!kakaoToken) {
      throw new Error('KAKAO_TOKEN_ERROR');
    }

    const accessToken = await authService.kakaoSignin(kakaoToken);
    return res.status(200).json({ accessToken: accessToken });
  }

  async getAllUsers(req: Request, res: Response) {
    const getAllUsers = authService.getAllUsers();
    res.json(getAllUsers);
  }
}

export default new auth();
