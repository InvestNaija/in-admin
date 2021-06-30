export interface IShare {
  id?: string,
  description: string,
  name: string,
  type: string,
  anticipatedMaxPrice: number,
  anticipatedMinPrice: number,
  sharePrice: number,
  availableShares: number,
  openForPurchase: boolean,
  closingDate: string,
  popularity: number,
  image: string,
  createdAt?: string,
  updatedAt?: string;
}
