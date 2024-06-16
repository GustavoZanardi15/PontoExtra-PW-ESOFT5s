import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/types/http.exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message = "Internal Server Error";
  let statusCode = 500;
  let { name } = err;

  if (err instanceof HttpException) {
    message = err.message;
    statusCode = err.statusCode;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      if (err.meta) message = `${err.meta.modelName} not found`;
      statusCode = 404;
      name = "Not Found Error";
    }

    if (err.code === "P2002") {
      if (err.meta) message = `${err.meta.target}`;
      statusCode = 400;
      name = "Bad Request Error";
    }

    if (err.code === "P2003") {
      if (err.meta)
        message = `Error on ${err.meta.modelName} foreign key constraint`;
      statusCode = 400;
      name = "Bad Request Error";
    }
  }

  res.status(statusCode).json({
    name,
    message,
    statusCode,
  });
  next();
};
