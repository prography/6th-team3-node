import bcryptjs from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import express from 'express';
// import { User } from '@prisma/client';
import config from '../config';

export interface JwtData {
  id: number;
  email: string;
  iat: string;
  exp: string;
}

export interface JwtUserData {
  id: number;
  email: string;
}

export async function hashPassword(password: string) {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  return hash;
}

export async function checkPassword(password: string, hashPassword: string) {
  return await bcryptjs.compare(password, hashPassword);
}
//TODO: 함수 이름 바꾸기
export function signJwtToken(id: number, email: string) {
  const payload = {
    id,
    email,
  };
  const signOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '15d',
  };
  const token = jwt.sign(payload, config.auth.jwt, signOptions);
  console.log(15, token);
  return token;
}

export function decodeJwtToken(authToken: string) {
  const data = jwt.verify(authToken, config.auth.jwt) as JwtData;
  // if (data === null) throw new
  return data;
}

export default function jwtMiddleware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const jwt = request.headers.authorization || '';
  const data = decodeJwtToken(jwt);
  const { id, email } = data;
  // 유효 기간이 하루 남았다면 토큰 재발급
  if (Date.now() / 1000 - parseInt(data.iat) > 60 * 60 * 24) {
    const freshToken = signJwtToken(id, email);
    response.set('Authorization', freshToken);
  }

  const responseData: JwtUserData = {
    id,
    email,
  };
  request.body.user = responseData;
  return next();
}
