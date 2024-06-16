import { PrismaClient } from "@prisma/client";
import express from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { opts, specs } from "./common/swagger/swagger-config";
import { errorMiddleware } from "./common/middlewares/error-handler.middleware";
import taskRoutes from "./task/task.router";
import appRoutes from "./routes";

const prismaClient = new PrismaClient();

export class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.cors();
    this.database();
    this.middlewares();
    this.routes();
    this.app.use(errorMiddleware);
  }

  private cors() {
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      next();
    });
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../public"))); 
  }

  private routes() {
    this.app.use("/api", swaggerUi.serve, swaggerUi.setup(specs, opts));
    this.app.use(appRoutes);
    this.app.use(taskRoutes);

    this.app.get('/tasks', async (req, res) => {
      const tasks = await prismaClient.task.findMany();
      res.json(tasks);
    });

    this.app.post('/tasks', async (req, res) => {
      const { title, description } = req.body;
      const newTask = await prismaClient.task.create({
        data: {
          title,
          description,
        },
      });
      res.json(newTask);
    });

    this.app.put('/tasks/:id', async (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      const updatedTask = await prismaClient.task.update({
        where: { id: Number(id) },
        data: { title, description },
      });
      res.json(updatedTask);
    });

    this.app.delete('/tasks/:id', async (req, res) => {
      const { id } = req.params;
      await prismaClient.task.delete({ where: { id: Number(id) } });
      res.json({ message: 'Task deleted' });
    });
  }
  private async database() {
    await prismaClient
      .$connect()
      .then(() => {
        console.log("Connected to database!");
      })
      .catch(async (error) => {
        await prismaClient.$disconnect();
        console.error("Error connecting to database: ", error);
      });
  }
}

export default new App().app;