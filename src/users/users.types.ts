export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
}

export interface UserLogin {
  access_token: string;
}
