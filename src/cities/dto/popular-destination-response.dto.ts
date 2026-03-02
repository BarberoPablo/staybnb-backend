export class PopularDestinationResponseDto {
  id: string;
  name: string;
  state?: string;
  country?: string;
  lat: number;
  lng: number;
  listingCount: number;
  imageUrl?: string;
  createdAt: Date;
}
