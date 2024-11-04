export interface Product {
    id?: string;
    name: string;
    category: string;
    supplierId: string;
    price: number;
    availability: boolean;
    shippingTime: number;
    createdAt?: Date;
    updatedAt?: Date;
  }