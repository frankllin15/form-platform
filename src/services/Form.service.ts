import { CreateQuestionInput } from "./../types/questions.d";
import {
  CreateFormInput,
  FindManyFormsInput,
  FindUniqueFormInput,
  UpdateFormInput,
  CreateQuestionUpdateForm,
} from "../types/form";
import db from "../lib/prismaClient";
import { v4 as uuid } from "uuid";

const formIncludes = {
  questions: {
    include: {
      options: {
        select: {
          id: true,
          text: true,
          answer: true,
          order: true,
        },
      },
    },
  },
};

export const FormService = {
  async create(input: CreateFormInput) {
    const { name, description, questions } = input;

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
  async findMany(input: FindManyFormsInput) {
    return await db.form.findMany({
      ...input,
      include: {
        ...formIncludes,
      },
    });
  },

  async findUnique(input: FindUniqueFormInput) {
    console.log("input", input);
    return await db.form.findUnique({
      where: {
        id: input.id,
      },
      include: {
        ...formIncludes,
      },
    });
  },
  async update({ id, data }: UpdateFormInput) {
    const form = db.form.update({
      where: {
        id,
      },
      data: {
        ...data,
        questions: {
          update: data.questions.update.map((question) => {
            return {
              where: {
                id: question.id,
              },
              data: {},
            };
          }),
        },
      },
    });
  },
  async totalItems() {
    return await db.form.count();
  },
};
