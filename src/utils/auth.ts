import { AuthChecker } from "type-graphql"

import { Context } from "~/context"

import { verifyToken } from "./jwt"

export const customAuthChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles
) => {
  try {
    const token = context.token
    const isValid = await verifyToken(token)

    return true
  } catch {
    return false
  }
}
