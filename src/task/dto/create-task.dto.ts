export interface CreateTaskDto {
  title: string;
  description?: string;
}

export const createTaskDto = {
  title: {
    type: "string",
    required: "title is required",
  },
  description: {
    type: "string",
  },
};
