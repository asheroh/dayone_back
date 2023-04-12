import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    
    const token = req.headers.cookie?.split("=")[1].split(";")[0]
    console.log(token,"밸리데이션");


    if (!token) {
      return res.status(401).json({ message: 'TOKEN NOT FOUND' });
    }


    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
      throw new Error(
        'JWT_SECRET_KEY is not defined in the environment variables.',
      );
    }

    const decoded = await jwt.verify(token, JWT_SECRET_KEY);
    console.log(decoded, '검증 결과값');

    next();
  } catch (err) {
    return res.status(401).json({ message: 'TOKEN IS NOT VALID' });
  }
};

export default { validateToken };
