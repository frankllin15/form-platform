export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserInput = {
  id: string;
  name?: string;
  email?: string;
};
