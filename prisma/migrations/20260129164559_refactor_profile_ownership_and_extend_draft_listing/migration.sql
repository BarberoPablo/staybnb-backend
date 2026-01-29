-- DropForeignKey
ALTER TABLE "DraftListing" DROP CONSTRAINT "DraftListing_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- AlterTable
ALTER TABLE "DraftListing" ADD COLUMN     "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "bathrooms" INTEGER,
ADD COLUMN     "bedrooms" INTEGER,
ADD COLUMN     "beds" INTEGER,
ADD COLUMN     "checkInTime" TEXT,
ADD COLUMN     "checkOutTime" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "currentStep" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lng" DOUBLE PRECISION,
ADD COLUMN     "location" JSONB,
ADD COLUMN     "maxAdults" INTEGER,
ADD COLUMN     "maxChildren" INTEGER,
ADD COLUMN     "maxGuests" INTEGER,
ADD COLUMN     "maxInfants" INTEGER,
ADD COLUMN     "maxPets" INTEGER,
ADD COLUMN     "minCancelDays" INTEGER,
ADD COLUMN     "privacyType" "PrivacyType",
ADD COLUMN     "promotions" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "propertyType" "PropertyType",
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "visitedSteps" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftListing" ADD CONSTRAINT "DraftListing_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
