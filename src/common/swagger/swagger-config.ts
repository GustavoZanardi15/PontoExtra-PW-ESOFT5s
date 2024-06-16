import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { SwaggerUiOptions } from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API With Postgres and Swagger",
      version: "0.1.0",
      description:
        "This is a todo-list application made with Express, documented with Swagger and authenticated with JWT",
    },
  },

  apis: [
    path.resolve(__dirname, "../../task/task.router.ts"),
    path.resolve(__dirname, "../../task/entities/task.entity.ts"),
  ],
} as swaggerJSDoc.Options;

export const opts = {
  swaggerOptions: { docExpansions: "none", persistAuthorization: true },
} as SwaggerUiOptions;

export const specs = swaggerJSDoc(options);
