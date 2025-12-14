// RegisterInput
export interface RegisterInput {
  email: string;
  password: string;
  displayName: string;
}

//LoginInput
export interface LoginInput {
  email: string;
  password: string;
}
//UserData
export interface UserData {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

//AuthTokens
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// export interface AuthResponse extends AuthTokens , this will have one fieds extra that is user : UserData
export interface AuthResponse extends AuthTokens {
  user: UserData;
}
