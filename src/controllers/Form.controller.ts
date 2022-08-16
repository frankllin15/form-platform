import db from "../lib/prismaClient";
import { Request, Response } from "express";
import { CreateFormRequest, GetFormRequest } from "./../types/form.d";
import { FormService } from "../services/Form.service";
export const FormController = {
  async create(req: Request, res: Response) {
    try {
      const form = await FormService.create(req.body);

      return res.status(202).json(form);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  },
  async findMany(req: Request, res: Response) {
    try {
      const forms = await FormService.findMany(req.body);
      const total_items = await FormService.totalItems();
      res.status(200).json({
        forms,
        total_items,
      });
    } catch (e: any) {
      res.status(400).json({
        error: {
          message: e.message,
        },
      });
    }
  },
  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id) throw new Error("Required param missing 'id'");
      const form = await FormService.findUnique({ id });

      res.status(200).json({
        form,
      });
    } catch (e: any) {
      res.status(400).json({
        error: {
          message: e.message,
        },
      });
    }
  },
};
