export type CartType = {
  id: number;
  discountedTotal: number;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
  products: IProduct[];
};

export type IProduct = {
  discountPercentage: number;
  discountedTotal: number;
  id: number;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
  total: number;
};
