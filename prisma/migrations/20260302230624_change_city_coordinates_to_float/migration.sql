/*
  Warnings:

  - You are about to alter the column `lat` on the `City` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,8)` to `DoublePrecision`.
  - You are about to alter the column `lng` on the `City` table. The data in that column could be lost. The data in that column will be cast from `Decimal(11,8)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "City" ALTER COLUMN "lat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "lng" SET DATA TYPE DOUBLE PRECISION;
