export interface Pet {
  id: number;
  category?: {
    id?: number;
    name?: string;
  };
  name: string;
  photoUrls: string[];
  tags?: {
    id?: number;
    name?: string;
  }[];
  status: 'available' | 'pending' | 'sold';
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}
