import { Prisma } from "@prisma/client";
import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CreateTaskDto, UpdateTaskDto } from "./dto";
import { TaskQueryParams } from "./dto/task-query.params";
import { TaskRepository } from "./task.repository";
import { mergeObjects } from "../common/utils/merge-objects";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto) {
    const Task = await this.taskRepository.create(createTaskDto);
    return Task;
  }

  async findAll(filterParams: TaskQueryParams) {
    if (Object.keys(filterParams).length === 0) {
      return await this.taskRepository.findAll({});
    }

    const queryRaw: Array<Prisma.TaskWhereInput> = [];

    if (filterParams.longestDescription) {
      queryRaw.push({});
    }

    const query = mergeObjects(queryRaw);

    const task = await this.taskRepository.findAll(query);
    return task;
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException(`Unable to find Task with id ${id}`);
    return task;
  }

  async getLongestDescription() {
    const tasks = await this.taskRepository.findAll({});

    let largestDescription = 0;
    let taskIndex = 0;

    tasks.forEach((task, index) => {
      if (task.description && task.description.length > largestDescription) {
        largestDescription = task.description.length;
        taskIndex = index;
      }
    });

    return tasks[taskIndex];
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.update(id, updateTaskDto);
    return task;
  }

  async remove(id: string) {
    await this.taskRepository.remove(id);
  }
}
