import { Request, Response } from 'express';
import authService from '../services/auth.service';

class auth {
  // async kakaoLoginStart(req: Request, res: Response) {
  //   const redirectUrl = authService.getKakaoLoginUrl();
  //   console.log(redirectUrl);
  //   res.header('Access-Control-Allow-Origin', '*');
  //   return res.redirect(redirectUrl);
  // }

  async getAccessToken(req: Request, res: Response) {
    const kakaoCode = req.query.code as string;
    console.log(kakaoCode);

    const kakaoTokenResponse = await authService.getKakaoAccessToken(kakaoCode);
    const kakaoAccessToken = kakaoTokenResponse.access_token as string;

    console.log(kakaoAccessToken, 123);

    if (!kakaoAccessToken) {
      throw new Error('KAKAO_TOKEN_ERROR');
    }

    const accessToken = await authService.kakaoSignin(kakaoAccessToken);

    // Set the access token as a cookie

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set 'secure' to true in production
      maxAge: 86400 * 1000, // 1 day in milliseconds
    });

    // Send a response indicating success
    return res.status(200).json({ message: 'Access token set as a cookie' });
  }

  async getAllUsers(req: Request, res: Response) {
    const getAllUsers = authService.getAllUsers();
    res.header('Access-Control-Allow-Origin', '*');

    res.json(getAllUsers);
  }
}

export default new auth();
