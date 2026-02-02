/*
  Warnings:

  - You are about to drop the column `city` on the `DraftListing` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `DraftListing` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `DraftListing` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `DraftListing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DraftListing" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "lat",
DROP COLUMN "lng";
