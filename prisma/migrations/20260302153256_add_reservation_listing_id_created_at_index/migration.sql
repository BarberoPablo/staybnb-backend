-- DropIndex
DROP INDEX "Reservation_listingId_idx";

-- CreateIndex
CREATE INDEX "Reservation_listingId_createdAt_idx" ON "Reservation"("listingId", "createdAt");
