import { ListingStatus } from '@prisma/client';

export class ListingDto {
  id: string;
  title: string;
  description: string;
  nightPrice: number;
  status: ListingStatus;
  createdAt: Date;
  updatedAt: Date;
  //Complete
}
