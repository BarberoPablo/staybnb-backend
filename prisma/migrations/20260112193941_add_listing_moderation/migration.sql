-- CreateEnum
CREATE TYPE "ListingModerationAction" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "ListingModeration" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" "ListingModerationAction" NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListingModeration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListingModeration" ADD CONSTRAINT "ListingModeration_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingModeration" ADD CONSTRAINT "ListingModeration_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
