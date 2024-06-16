/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Titulo da tarefa
 *         description:
 *           type: string
 *           description: Descrição da tarefa
 *     ReturnTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Titulo da tarefa
 *         description:
 *           type: string
 *           description: Descrição da tarefa
 *         createdAt:
 *           type: string
 *           description: Data de criação da tarefa
 *           example: 2024-03-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: Data de atualização da tarefa
 *           example: 2024-03-01T00:00:00.000Z
 */

export interface TaskEntity {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  PENDING = "PENDING",
  DOING = "DOING",
  DONE = "DONE",
}
