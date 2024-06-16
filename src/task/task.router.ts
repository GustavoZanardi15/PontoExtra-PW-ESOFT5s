import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { TaskController, TaskRepository, TaskService } from "./index";
import { createTaskDto, updateTaskDto } from "./dto";

const taskController = new TaskController(
  new TaskService(new TaskRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Rotas para operações relacionadas a tarefas
 */
const taskRoutes = Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Cria uma tarefa nova
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnTask'
 * */
taskRoutes.post(
  "/tasks",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.create(req, res);
  }),
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags: [Tasks]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filtrar tarefas por status
 *       - in: query
 *         name: startConclusionDate
 *         required: false
 *         description: Data de início do período de filtro de vencimento da tarefa YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *       - in: query
 *         name: endConclusionDate
 *         required: false
 *         description: Data de fim do período de filtro de vencimento da tarefa YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReturnTask'
 */
taskRoutes.get(
  "/tasks",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.findAll(req, res);
  }),
);

/**
 * @swagger
 * /tasks/id/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do tarefa a ser retornada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: tarefa retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnTask'
 * */
taskRoutes.get(
  "/tasks/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.findOne(req, res);
  }),
);

/**
 * @swagger
 * /tasks/longest-description:
 *   get:
 *     summary: Retorna a tarefa com a maior descrição
 *     tags: [Tasks]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tarefa com a maior descrição retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ReturnTask'
 */
taskRoutes.get(
  "/tasks/longest-description",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.getLongestDescription(req, res);
  }),
);

/**
 * @swagger
 * /tasks/id/{id}:
 *   patch:
 *     summary: Atualiza uma tarefa existente pelo ID
 *     tags: [Tasks]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do tarefa a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnTask'
 * */
taskRoutes.patch(
  "/tasks/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.update(req, res);
  }),
);

/**
 * @swagger
 * /tasks/id/{id}:
 *   delete:
 *     summary: Exclui uma tarefa existente pelo ID
 *     tags: [Tasks]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: tarefa excluída com sucesso
 */
taskRoutes.delete(
  "/tasks/id/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.remove(req, res);
  }),
);

export default taskRoutes;
