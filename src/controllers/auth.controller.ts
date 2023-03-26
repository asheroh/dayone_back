import { Request, Response } from 'express';
import authService from '../services/auth.service';

class authC {
  async kakaoLoginStart(req: Request, res: Response) {
    const redirectUrl = authService.getKakaoLoginUrl();
    console.log(redirectUrl);

    return res.redirect(redirectUrl);
  }

  async kakaoRedirect(req: Request, res: Response) {
    const kakaoAccessToken = await authService.getKakaoAccessToken(
      req.query.code as string,
    );
    res.json(kakaoAccessToken);
  }

  async kakaoSignin(req: Request, res: Response) {
    const kakaoToken: any = req.headers.authorization;
    if (!kakaoToken) {
      throw new Error('KAKAO_TOKEN_ERROR');
    }
    const accessToken = await authService.kakaoSignin(kakaoToken);
    return res.status(200).json(accessToken);
  }
}

export default new authC();
