-- CreateIndex
CREATE INDEX "DraftListing_hostId_idx" ON "DraftListing"("hostId");

-- CreateIndex
CREATE INDEX "Listing_hostId_idx" ON "Listing"("hostId");

-- CreateIndex
CREATE INDEX "ListingModeration_listingId_idx" ON "ListingModeration"("listingId");

-- CreateIndex
CREATE INDEX "ListingModeration_adminId_idx" ON "ListingModeration"("adminId");

-- CreateIndex
CREATE INDEX "Reservation_listingId_idx" ON "Reservation"("listingId");

-- CreateIndex
CREATE INDEX "Reservation_userId_idx" ON "Reservation"("userId");
