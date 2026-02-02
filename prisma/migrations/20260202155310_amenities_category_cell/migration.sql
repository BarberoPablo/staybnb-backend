/*
  Warnings:

  - Added the required column `category` to the `Amenity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AmenityCategory" AS ENUM ('GENERAL', 'KITCHEN', 'DINING', 'BEDROOM', 'BATHROOM', 'ENTERTAINMENT', 'SECURITY', 'ACTIVITIES');

-- AlterTable
ALTER TABLE "Amenity" ADD COLUMN     "category" "AmenityCategory" NOT NULL;
