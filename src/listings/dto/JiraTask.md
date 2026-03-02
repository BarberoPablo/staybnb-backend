Title: "Feat: Create GET /listings/featured endpoint with ranking and pagination"

Description:
Implement a dedicated endpoint to return featured listings for the homepage. This endpoint must be independent from search and optimized for system-driven discovery. It should support limit-based pagination and apply the existing featured ranking logic.

The endpoint must only return published listings and include the required aggregates (favorites and reservations count). The goal is to provide a clean, cache-friendly contract that the frontend can consume via parallel requests.

Requirements

Create route: GET /listings/featured

Support query params:

limit (default: 12, max capped)

offset (default: 0)

Filter:

status = published

minimum rating threshold (current featured rule)

Apply featured ranking algorithm (existing sortByFeatured)

Include counts:

favorites

reservations

Return parsed domain entity (via existing mapper)

Add input validation for query params

Add basic error handling

Prepare for HTTP caching (no-store for now, but structure ready)

Acceptance Criteria

Endpoint returns only published listings

Pagination works correctly

Ranking is applied consistently

Response shape matches frontend expectations

No coupling with search endpoint

Code follows module boundaries and is testable
