/*
  Warnings:

  - You are about to drop the column `pricePerNight` on the `DraftListing` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerNight` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `nightPrice` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Listing_pricePerNight_idx";

-- AlterTable
ALTER TABLE "DraftListing" DROP COLUMN "pricePerNight",
ADD COLUMN     "nightPrice" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "pricePerNight",
ADD COLUMN     "nightPrice" DECIMAL(10,2) NOT NULL;

-- CreateIndex
CREATE INDEX "Listing_nightPrice_idx" ON "Listing"("nightPrice");
