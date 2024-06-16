import { CreateTaskDto } from "./create-task.dto";

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}

export const updateTaskDto = {
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
};
