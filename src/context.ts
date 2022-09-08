import { PrismaClient } from "@prisma/client"
import { Request } from "express"
import { prisma } from "prisma/client"

export interface Context {
  prisma: PrismaClient
  token: string
}

export const context = ({ req }: { req: Request }): Context => {
  const token = req?.headers?.authorization?.split(" ") ?? ""

  return {
    token: token[1],
    prisma: prisma,
  }
}
