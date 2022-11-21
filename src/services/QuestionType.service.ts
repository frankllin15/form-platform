import db from '../lib/prismaClient';

export const QuestionTypeService = {
  async create(input: any) {
    const { name } = input;
    return await db.questionType.create({
      data: {
        name,
      },
    });
  },
  async findMany() {
    return await db.questionType.findMany();
  },
};
