// Type definitions for users
export type User = {
  id: number;
  name: string;
  email: string;
};

// Type definitions for Body parameters
export type CreateUserBody = {
  name: string;
  email: string;
  password: string;
};

// Type definitions for Query parameters
export type CreateUserQuery = {
  name: string;
  email: string;
};
