import db from '../lib/prismaClient';
import { CreateUserInput, UpdateUserInput } from '../types/user';
import bcrypt from 'bcryptjs';

export const UserService = {
  async getAll(options: { take?: number; skip?: number }) {
    const users = await db.user.findMany({
      ...options,
    });
    return users;
  },
  async getOne(id: string) {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  },
  async create(data: CreateUserInput) {
    const encodedPassword = await bcrypt.hash(data.password, 10);

    return await db.user.create({
      data: {
        ...data,
        password: encodedPassword,
      },
    });
  },
  async update(data: UpdateUserInput) {
    const { id, ...rest } = data;
    return await db.user.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  },
};
