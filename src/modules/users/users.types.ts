interface googleCredentials {
  access_token: string;
  refresh_token: string;
}
export interface User {
  _id: string;
  name: string;
  password: string;
  email: string;
  google: googleCredentials;
}

export interface UserLogin {
  access_token: string;
}
