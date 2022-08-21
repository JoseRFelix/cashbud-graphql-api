import { Account } from "@generated/type-graphql";
import { prisma } from "../../prisma/client";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "~/context";

@Resolver()
export default class AccountResolver {
  @Query((_returns) => [Account])
  async getAccounts(@Ctx() ctx: Context) {
    const accounts = await prisma.account.findMany();
    return accounts;
  }
}
