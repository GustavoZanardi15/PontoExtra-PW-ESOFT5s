import { Request, Response } from "express";
import { TaskService } from "./task.service";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  async create(req: Request, res: Response) {
    const task = await this.taskService.create(req.body);
    return res.status(201).json(task);
  }

  async findAll(req: Request, res: Response) {
    const tasks = await this.taskService.findAll(req.query);
    return res.status(200).json(tasks);
  }

  async findOne(req: Request, res: Response) {
    const task = await this.taskService.findOne(req.params.id);
    return res.status(200).json(task);
  }

  async getLongestDescription(req: Request, res: Response) {
    const task = await this.taskService.getLongestDescription();
    return res.status(200).json(task);
  }

  async update(req: Request, res: Response) {
    const task = await this.taskService.update(req.params.id, req.body);
    return res.status(200).json(task);
  }

  async remove(req: Request, res: Response) {
    await this.taskService.remove(req.params.id);
    return res.status(204).json();
  }
}
