import {
  CreateFormInput,
  FindManyFormsInput,
  FindUniqueFormInput,
  UpdateFormInput,
} from '../types/form';
import db from '../lib/prismaClient';

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
        author: {
          connect: { id: input.authorId },
        },
        name,
        description,
        questions: {
          create: questions.map(question => {
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
                  create: options?.create?.map((option, index) => {
                    return {
                      text: option.text,
                      answer: option.answer,
                      order: index,
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
