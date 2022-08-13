import { CreateQuestionInput } from './../types/questions.d';
import db from '../lib/prismaClient';
import { Request, Response } from 'express';

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export const QuestionController = {
  async create(req: TypedRequestBody<CreateQuestionInput>, res: Response) {
    try {

      const { question } = req.body;
      const newQuestion = await db.question.create({
        data: {
          question,
        },
      });

      return res.json(newQuestion);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};
