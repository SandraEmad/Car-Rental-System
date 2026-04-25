export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  role: string;
  wallet: number;
  created_at: string;
}

export interface UserResponse {
  data: IUser[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }
}
