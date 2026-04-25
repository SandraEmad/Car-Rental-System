export interface IOrder {
  id: number;
  user_id: number;
  car_id: number;
  payment_type: string;
  payment_status: string;
  order_type: string;
  total_price: number;
  delivery_date: string;   
  receiving_date: string;
  created_at: string;
  user?: any;
  car?: any;
}
