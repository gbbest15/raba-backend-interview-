export interface Supplier {
    id?: string;
    name: string;
    rating: number;
    location: string;
    deliveryOptions: DeliveryOption[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type DeliveryOption = 'standard' | 'expedited';