/*
  Warnings:

  - You are about to drop the column `conclusionDate` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "conclusionDate",
ADD COLUMN     "conclusion" TIMESTAMP(3);
