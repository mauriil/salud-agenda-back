export interface googleCredentials {
  access_token: string;
  refresh_token: string;
}
export interface bankAccount {
  descriptiveName: string;
  cbu: string;
  alias: string;
}
export interface User {
  _id: string;
  name: string;
  password: string;
  email: string;
  google: googleCredentials;
  bankAccount: [bankAccount];
}

export interface UserLogin {
  access_token: string;
}
