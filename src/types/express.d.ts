interface UserData {
  id: number;
  email: string;
}

declare namespace Express {
  export interface Request {
    user: UserData;
  }
}
