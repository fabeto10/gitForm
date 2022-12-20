export interface ProductsI{
  id: string;
  optional_code: any;
  description: string;
  labels: string[];
  images: string[],
  price: string | number;
  existence: number | string;
  variants: object[];
}
