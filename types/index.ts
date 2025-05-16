export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  price: number;
  isFree: boolean;
  category: string;
  rating: number;
  totalStudents: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  avatar: string | null;
  walletBalance: number;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: 'credit' | 'debit';
}