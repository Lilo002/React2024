export type User = {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: 'male' | 'female' | null;
  terms: boolean;
  photo?: FileList;
  country: string;
};

export type UserOnStore = {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: 'male' | 'female' | null;
  terms: boolean;
  photo?: string;
  country: string;
};

export type Errors = {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  passwordRepeat?: string;
  gender?: string;
  terms?: string;
  photo?: string;
  country?: string;
};
