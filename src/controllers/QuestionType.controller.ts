import { Request, Response } from 'express';
import { HttpError } from '../utils/error';
import { QuestionTypeService } from '../services/QuestionType.service';

export const QuestionTypeController = {
  async findMany(req: Request, res: Response) {
    try {
      const questionTypes = await QuestionTypeService.findMany();
      res.status(200).json({
        questionTypes,
      });
    } catch (e: any) {
      res.status(400).json({
        error: {
          message: e.message,
        },
      });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) throw new HttpError(400, "Required param missing 'name'");

      const questionType = await QuestionTypeService.create({
        name,
      });

      return res.status(201).json(questionType);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};
