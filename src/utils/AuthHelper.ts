import jwt, { SignOptions } from 'jsonwebtoken';
// import { User } from '@prisma/client';
import config from '../config';
import { User } from '@prisma/client';

export function signJwtToken(user: User) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const signOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '15d',
  };
  const token = jwt.sign(payload, config.auth.jwt, signOptions);
  console.log(15, token);
  return token;
}
