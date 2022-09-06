import { UserTokenPayload } from './../types/auth.d';
import jwt from 'jsonwebtoken';

export const AuthService = {
  verifyToken: (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string, {
      complete: true,
    });
  },
  createToken: (user: UserTokenPayload) => {
    return jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
  },
};
