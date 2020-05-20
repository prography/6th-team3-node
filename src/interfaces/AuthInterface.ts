export interface UserToken {
  accessToken: string;
  refreshToken: string;
}

export interface Error {
  status: string;
  name: string;
  data: {
    error: string;
    description: string;
  };
}

export interface AuthorizedCodeError {
  status: string;
  name: string;
  data: {
    error: string;
    description: string;
  };
}

export interface UserTokenError {
  status: string;
  name: string;
  data: {
    error: string;
    description: string;
  };
}
