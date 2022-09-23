/*
  Warnings:

  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `QuestionOptions` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `QuestionOptions` table. All the data in the column will be lost.
  - Added the required column `label` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `QuestionOptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "text",
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuestionOptions" DROP COLUMN "answer",
DROP COLUMN "text",
ADD COLUMN     "value" TEXT NOT NULL;
