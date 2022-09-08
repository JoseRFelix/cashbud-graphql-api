import { sign, verify } from "jsonwebtoken"

import { JWTSignError } from "./errors"

export async function signToken<Dict extends Record<any, any>>(dict: Dict) {
  const secret = process.env.JWT_SECRET

  if (!secret)
    return Promise.reject(new JWTSignError("JWT_SECRET is not defined"))

  return await sign(dict, secret, {
    expiresIn: "1d",
  })
}

export async function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET

  if (!secret)
    return Promise.reject(new JWTSignError("JWT_SECRET is not defined"))

  return await verify(token, secret)
}
