1. If there is no city, empty array should be returned and city center with null.
2. I dont want to filter by country, only city, so I removed country from a possible query option.
3. "Includes" properties are not necessary in this search, they will be more usefull in the "findById" service, because in the search I am returning a lot of listings and I want to avoid returning data that is not going to be used, so I changed the returned in the search, the type of the return is going to be the already existed type called "ListingCardDto" instead of "ListingResponseDto".4
4. Should I create a reusable const for the "select" in the listing repository functions that returns a type of "ListingCardDto"? To reuse this structure:
   select: {
   id: true,
   title: true,
   nightPrice: true,
   images: true,
   ratingAvg: true,
   propertyType: true,
   privacyType: true,
   city: true,
   country: true,
   location: true,
   }
