import { Request, Response } from 'express';
import session from 'express-session'
import jwt, { JwtPayload } from 'jsonwebtoken';

import { CustomSession } from '../interfaces/CustomSession'

import authService from '../services/auth.service';

class AuthController {

  public isUser = async (req:Request, res: Response) => {
    const getUserId = (req.session as CustomSession).userId;
    if(!getUserId) {
      throw new Error("DOESN'T_EXIST_USER")
    }
    const username = await authService.isUser(getUserId);
    res.status(200).json({ message: "유저 정보가 확인 되었습니다", 
    data : {
      username : username}
    })
    
  }
  // 백엔드 테스트
  public kakaoLoginStart = async (req: Request, res: Response) => {
    const redirectUrl = authService.getKakaoLoginUrl();
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  }
  // 백엔드 테스트
  public kakaoAuthCode = async(req: Request, res: Response) => {
    const kakaoAuthCode = req.query.code;
    res.json({ kakaoAuthCode: kakaoAuthCode });
  }

  public getAccessToken = async (req: Request, res: Response) => {
    // const kakaoCode: any = req.query.code; // 프론트 통신시 인가코드 받기
    const kakaoCode = req.headers.authorization?.split(" ")[1] as string // 백엔드 테스트시 인가코드 전달
    console.log(kakaoCode, "123");
    const kakaoTokenResponse = await authService.getKakaoAccessToken(kakaoCode);
    const kakaoAccessToken = kakaoTokenResponse.access_token as string;
  
    if (!kakaoAccessToken) {
      throw new Error('KAKAO_TOKEN_ERROR');
    }
  
    const accessToken = await authService.kakaoSignin(kakaoAccessToken);
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string
    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
    
    let userId: string;
    
    if (typeof decoded === "object" && "id" in decoded) {
      userId = decoded.id;
    } else {
      throw new Error("Invalid JWT payload");
    }
  
    (req.session as CustomSession).userId = userId;
    
    const username = await authService.isUser(userId)

    res
      .status(200)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(Date.now() + 3600000),
        maxAge: 86400 * 1000, // 1 day in milliseconds
      })
      .json({ message: "로그인 성공", username: username })
  }
 
  public getAllUsers = async(req: Request, res: Response) => {
    const getAllUsers = authService.getAllUsers();
    res.json(getAllUsers);
  }
}

export default new AuthController();
