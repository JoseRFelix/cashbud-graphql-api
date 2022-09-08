import { Account, AccountCreateInput } from "@generated/type-graphql"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"

import { Context } from "~/context"

@Resolver()
export default class AccountResolver {
  @Query(_returns => [Account])
  @Authorized()
  async getAccounts(@Ctx() ctx: Context) {
    const accounts = await ctx.prisma.account.findMany()
    return accounts
  }

  @Mutation(_returns => Account)
  async createAccount(
    @Arg("data") newAccountData: AccountCreateInput,
    @Ctx() ctx: Context
  ) {
    const account = await ctx.prisma.account.create({
      data: {
        name: newAccountData.name,
        description: newAccountData.description,
      },
    })
    return account
  }
}
