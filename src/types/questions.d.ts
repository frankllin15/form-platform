import { TypedRequestBody } from ".";

export type CreateQuestionInput = {
  text: string;
  options: CreateOptionQuestionInput[];
};

export type UpdateQuestionInput = {
  id: string;
  text?: string;
  options?: {
    update: UpdateOptionQuestionInput[];
    create: CreateOptionQuestionInput[];
    delete: {
      id: string;
    }[];
  };
};

export type CreateOptionQuestionInput = {
  text: string;
  answer: boolean;
  // order: number;
};

export type UpdateOptionQuestionInput = {
  id: string;
  text?: string;
  answer?: boolean;
};

export type CreateQuestionRequest = TypedRequestBody<CreateQuestionInput>;
