import "dotenv/config";

export const PORT = process.env.PORT || (3000 as number);
export const NODE_ENV = process.env.NODE_ENV || ("development" as string);
export const JWT_SECRET =
  process.env.JWT_SECRET || ("supersecrettoken" as string);
