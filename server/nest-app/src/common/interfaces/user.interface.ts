export interface User {
  id: number;
  name: string;
  email: string;
  hashedRT?: string;
  hashedPassword: string;
  role: 'user' | 'admin';
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
