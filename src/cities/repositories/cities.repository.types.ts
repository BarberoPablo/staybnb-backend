export interface PopularCitiesOptions {
  take?: number;
  skip?: number;
}

export type RawPopularCity = {
  name: string;
  country: string;
  lat: number;
  lng: number;
  listingCount: number;
  imageUrl: string | null;
};
