
//Dto para crear una orden, el dto debe coincidir con la estructura de la entidad Order
export class CreateOrderDto {
  userId?: number;
  restaurantId: number;
  products: number[];
  location: {
    street: string;
    number: string;
    cityId: number;
    location: {
      lat: number;
      lng: number;
    };
  };
  //status?: OrderStatus;
  //delivery?: string;
}
