import {
  CreateFormInput,
  FindManyFormsInput,
  FindUniqueFormInput,
  UpdateFormInput,
} from '../types/form';
import db from '../lib/prismaClient';
import { HttpError } from '../utils/error';

const formIncludes = {
  author: {
    select: {
      id: true,
      name: true,
    },
  },
  questions: {
    include: {
      options: {
        select: {
          id: true,
          value: true,
          order: true,
        },
      },
    },
  },
};

export const FormService = {
  async create(input: CreateFormInput) {
    const { name, description, questions } = input;

    const user = await db.user.findUnique({
      where: {
        id: input.authorId,
      },
    });

    if (!user) throw new HttpError(400, 'User not found');

    return await db.form.create({
      data: {
        author: {
          connect: { id: input.authorId },
        },
        name,
        description,
        questions: {
          create: questions.map(question => {
            return {
              label: question.label,
              type: {
                connect: { id: question.questionTypeId },
              },
              order: question.order,
              options: {
                create: question.options.map((option, index) => {
                  return {
                    value: option.value,
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
    console.log('input', input);
    return await db.form.findUnique({
      where: {
        id: input.id,
      },
      include: {
        ...formIncludes,
      },
    });
  },
  async update({ id, data: { questions, ...formData } }: UpdateFormInput) {
    console.log('formData', questions.update[0].options?.delete[0]);
    return await db.form.update({
      where: {
        id,
      },
      data: {
        ...formData,
        questions: {
          update: questions?.update?.map(question => {
            const { id, options, ...questionData } = question;
            return {
              where: {
                id: id,
              },
              data: {
                ...questionData,
                options: {
                  update: options?.update?.map(option => {
                    const { id, ...optionData } = option;
                    return {
                      where: {
                        id: id,
                      },
                      data: {
                        ...optionData,
                      },
                    };
                  }),
                  create: options?.create?.map(option => {
                    return {
                      value: option.value,
                      order: option.order,
                    };
                  }),
                  deleteMany: {
                    id: {
                      in: options?.delete?.map(option => {
                        console.log(option);
                        return option.id;
                      }),
                    },
                  },
                },
              },
            };
          }),
          create: questions?.create?.map(question => {
            return {
              label: question.label,
              order: question.order,
              type: {
                connect: { id: question.questionTypeId },
              },
              options: {
                create: question.options.map(option => {
                  return {
                    value: option.value,
                    order: option.order,
                  };
                }),
              },
            };
          }),
        },
      },
      include: {
        questions: {
          include: { options: true },
        },
      },
    });
  },
  async delete({ id }: FindUniqueFormInput) {
    db.form.update({
      where: {
        id,
      },
      data: {
        questions: {
          deleteMany: {
            id: {},
          },
        },
      },
    });
    await db.form.delete({
      where: {
        id,
      },
    });
  },
  async totalItems() {
    return await db.form.count();
  },
};
