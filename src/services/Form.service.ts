import { CreateQuestionInput } from "./../types/questions.d";
import { CreateFormInput } from "../types/form";
import db from "../lib/prismaClient";
import { v4 as uuid } from "uuid";

export const FormService = {
  async create(input: CreateFormInput) {
    const { name, description, questions } = input;
    const formId = uuid();

    return await db.form.create({
      data: {
        name,
        description,
        questions: {
          create: questions.map((question) => {
            return {
              text: question.text,
              options: {
                create: question.options.map((option, index) => {
                  return {
                    text: option.text,
                    answer: option.answer,
                    order: index,
                  };
                }),
              },
            };
          }),
        },
      },
    });
  },

  async createFormQuestion(input: CreateQuestionInput) {
    const { text, options } = input;
    return await db.question.create({
      data: {
        formId: "",
        text,
        options: {
          create: options.map((option, index) => {
            return {
              text: option.text,
              answer: option.answer,
              order: index,
            };
          }),
        },
      },
    });
  },
};
