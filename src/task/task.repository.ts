import { PrismaClient } from "@prisma/client";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

const prisma = new PrismaClient();

export class TaskRepository {
  constructor() {}

  async create(createTaskDto: CreateTaskDto) {
    return prisma.task.create({
      data: {
        ...createTaskDto,
      },
    });
  }

  async findAll(filterParams: any) {
    return prisma.task.findMany(filterParams);
  }

  async findOne(id: string) {
    return prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return prisma.task.update({
      where: {
        id,
      },
      data: {
        ...updateTaskDto,
      },
    });
  }

  async remove(id: string) {
    return prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
