import { CreateQuestionRequest } from "./../types/questions.d";
import db from "../lib/prismaClient";
import { Request, Response } from "express";

export const QuestionController = {
  async create(req: Request, res: Response) {
    try {
      req;
      const { question } = req.body;
      const newQuestion = await db.question.create({
        data: {
          ...question,
        },
      });

      return res.json(newQuestion);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};
