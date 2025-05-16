export interface User {
  id: number;
  phone_number: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_phone_verified: boolean;
}

export interface VerifyOTPResponse {
  is_new: boolean;
  refresh: string;
  access: string;
  user: User;
}

export interface RequestOTPResponse {
  message: string;
  code?: string; // Only in development
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
} 