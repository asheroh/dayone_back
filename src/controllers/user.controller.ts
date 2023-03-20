import { Request, Response } from 'express';
import userService from '../services/user.service';

import { User } from '../interfaces/user.interface';

const signup = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.body as User;

    if (!id || !email) {
      return res.status(409).json({ message: 'KEY_ERROR' });
    }

    const newUser = await userService.signup(id, email);
    res
      .status(201)
      .json({ message: 'Created User Successfully', user: newUser });
  } catch (err: any) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default {
  signup,
};
