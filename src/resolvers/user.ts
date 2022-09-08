import { User } from "@generated/type-graphql"
import bcrypt from "bcrypt"
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql"

import { Context } from "~/context"

@Resolver()
export default class UserResolver {
  @Authorized()
  @Query(_returns => [User])
  async getUsers(@Ctx() ctx: Context) {
    const users = await ctx.prisma.user.findMany()
    return users
  }
}
