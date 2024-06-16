import { NextFunction } from "express";

export const asyncErrorHandler =
  (fn: any) => async (req: any, res: any, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
