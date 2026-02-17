/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - Added the required column `canceledAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nightPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalNights` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('UPCOMING', 'COMPLETED', 'CANCELED', 'CANCELED_BY_HOST');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "canceledAt" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "discount" DECIMAL(10,2),
ADD COLUMN     "discountPercentage" INTEGER,
ADD COLUMN     "guests" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "nightPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "status" "ReservationStatus" NOT NULL DEFAULT 'UPCOMING',
ADD COLUMN     "totalNights" INTEGER NOT NULL,
ALTER COLUMN "totalPrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6);
