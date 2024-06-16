/*
  Warnings:

  - You are about to drop the column `category_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `conclusion` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_user_id_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "category_id",
DROP COLUMN "conclusion",
DROP COLUMN "priority",
DROP COLUMN "status",
DROP COLUMN "user_id";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Color";

-- DropEnum
DROP TYPE "Priority";

-- DropEnum
DROP TYPE "Status";
