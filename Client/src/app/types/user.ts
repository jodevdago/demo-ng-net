export interface User {
  email: string;
  role: string | number;
  auth: boolean;
  level: number;
  fullname: string;
  id?: string;
}
