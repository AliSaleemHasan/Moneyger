/*
  Warnings:

  - The values [ICOOME,EXPENCE] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `Description` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('INCOME', 'EXPENSE');
ALTER TABLE "Record" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
