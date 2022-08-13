import db from "../lib/prismaClient";
import { Response } from "express";
import { CreateFormRequest } from "./../types/form.d";
import { FormService } from "../services/Form.service";
export const FormController = {
  async create(req: CreateFormRequest, res: Response) {
    try {
      const form = await FormService.create(req.body);

      return res.status(202).json(form);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  },
};
