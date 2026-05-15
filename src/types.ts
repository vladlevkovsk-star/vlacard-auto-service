export type UserRole = 'customer' | 'mechanic' | 'admin';

export interface Application {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  carBrand: string;
  carModel?: string;
  carYear?: string;
  problem: string;
  desiredDate?: string;
  status: 'pending' | 'diagnosing' | 'repairing' | 'ready' | 'completed';
  createdAt: string;
}

export interface Message {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  targetUserId?: string; // If empty, it's a global message
  createdAt: string;
  read?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
