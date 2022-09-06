import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/Auth.service';
import { createErrorResponse, HttpError } from '../utils/error';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new HttpError(401, 'Not token provided');
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new HttpError(401, 'Malformed token');
    }

    const user = AuthService.verifyToken(token);

    if (!user) {
      throw new HttpError(401, 'Invalid token');
    }

    req.user = user;
    next();
  } catch (err) {
    const { status, ...error } = createErrorResponse(err);

    res.status(status).json(error);
  }
};
