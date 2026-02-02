/*
  Warnings:

  - You are about to alter the column `nightPrice` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `totalPrice` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "nightPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;
