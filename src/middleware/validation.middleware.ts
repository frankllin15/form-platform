import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { errorToJson } from '../utils/error';

export const validade = (schema: z.AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      res.status(400).json(errorToJson(error));
    }
  };
};
