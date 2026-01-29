/*
  Warnings:

  - Added the required column `bathrooms` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beds` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxAdults` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxChildren` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxGuests` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxInfants` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPets` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PrivacyType" AS ENUM ('ENTIRE', 'PRIVATE', 'SHARED');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('HOUSE', 'APARTMENT', 'CABIN', 'BOAT');

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "checkInTime" TEXT NOT NULL DEFAULT '15:00',
ADD COLUMN     "checkOutTime" TEXT NOT NULL DEFAULT '11:00',
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "location" JSONB NOT NULL,
ADD COLUMN     "maxAdults" INTEGER NOT NULL,
ADD COLUMN     "maxChildren" INTEGER NOT NULL,
ADD COLUMN     "maxGuests" INTEGER NOT NULL,
ADD COLUMN     "maxInfants" INTEGER NOT NULL,
ADD COLUMN     "maxPets" INTEGER NOT NULL,
ADD COLUMN     "minCancelDays" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "privacyType" "PrivacyType" NOT NULL DEFAULT 'PRIVATE',
ADD COLUMN     "propertyType" "PropertyType" NOT NULL;

-- CreateTable
CREATE TABLE "Favorite" (
    "userId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","listingId")
);

-- CreateIndex
CREATE INDEX "Listing_status_idx" ON "Listing"("status");

-- CreateIndex
CREATE INDEX "Listing_city_idx" ON "Listing"("city");

-- CreateIndex
CREATE INDEX "Listing_lat_lng_idx" ON "Listing"("lat", "lng");

-- CreateIndex
CREATE INDEX "Listing_pricePerNight_idx" ON "Listing"("pricePerNight");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
