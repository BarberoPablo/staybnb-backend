/*
  Warnings:

  - You are about to alter the column `nightPrice` on the `DraftListing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - Made the column `title` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bathrooms` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bedrooms` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `beds` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkInTime` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkOutTime` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lat` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lng` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxAdults` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxChildren` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxGuests` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxInfants` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxPets` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minCancelDays` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `privacyType` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `propertyType` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nightPrice` on table `DraftListing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DraftListing" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT '',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "bathrooms" SET NOT NULL,
ALTER COLUMN "bathrooms" SET DEFAULT 0,
ALTER COLUMN "bedrooms" SET NOT NULL,
ALTER COLUMN "bedrooms" SET DEFAULT 0,
ALTER COLUMN "beds" SET NOT NULL,
ALTER COLUMN "beds" SET DEFAULT 0,
ALTER COLUMN "checkInTime" SET NOT NULL,
ALTER COLUMN "checkInTime" SET DEFAULT '15:00',
ALTER COLUMN "checkOutTime" SET NOT NULL,
ALTER COLUMN "checkOutTime" SET DEFAULT '11:00',
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "city" SET DEFAULT '',
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" SET DEFAULT '',
ALTER COLUMN "lat" SET NOT NULL,
ALTER COLUMN "lat" SET DEFAULT 0,
ALTER COLUMN "lng" SET NOT NULL,
ALTER COLUMN "lng" SET DEFAULT 0,
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "location" SET DEFAULT '{}',
ALTER COLUMN "maxAdults" SET NOT NULL,
ALTER COLUMN "maxAdults" SET DEFAULT 2,
ALTER COLUMN "maxChildren" SET NOT NULL,
ALTER COLUMN "maxChildren" SET DEFAULT 0,
ALTER COLUMN "maxGuests" SET NOT NULL,
ALTER COLUMN "maxGuests" SET DEFAULT 2,
ALTER COLUMN "maxInfants" SET NOT NULL,
ALTER COLUMN "maxInfants" SET DEFAULT 0,
ALTER COLUMN "maxPets" SET NOT NULL,
ALTER COLUMN "maxPets" SET DEFAULT 0,
ALTER COLUMN "minCancelDays" SET NOT NULL,
ALTER COLUMN "minCancelDays" SET DEFAULT 3,
ALTER COLUMN "privacyType" SET NOT NULL,
ALTER COLUMN "privacyType" SET DEFAULT 'ENTIRE',
ALTER COLUMN "propertyType" SET NOT NULL,
ALTER COLUMN "propertyType" SET DEFAULT 'HOUSE',
ALTER COLUMN "nightPrice" SET NOT NULL,
ALTER COLUMN "nightPrice" SET DEFAULT 40,
ALTER COLUMN "nightPrice" SET DATA TYPE INTEGER;
