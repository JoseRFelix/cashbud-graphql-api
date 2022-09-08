import { User } from "@generated/type-graphql"
import bcrypt from "bcrypt"
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql"

import { Context } from "~/context"
import { signToken } from "~/utils/jwt"

@InputType()
class SignUpUniqueInput {
  @Field()
  email!: string

  @Field()
  password!: string

  @Field()
  name!: string
}

@InputType()
class SignInUniqueInput {
  @Field()
  email!: string

  @Field()
  password!: string
}

@ObjectType()
class SignInResponse {
  @Field()
  token!: string
}

@Resolver()
export default class AuthResolver {
  @Mutation(_returns => SignInResponse)
  async signIn(@Arg("data") data: SignInUniqueInput, @Ctx() ctx: Context) {
    const { email, password } = data

    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) throw new Error("Could not find user")

    const userPasswordHash = user.password
    const isPasswordValid = await bcrypt.compare(password, userPasswordHash)

    if (!isPasswordValid) throw new Error("Wrong password.")

    const token = await signToken(user)

    return { token }
  }

  @Mutation(_returns => User)
  async signUp(@Arg("data") data: SignUpUniqueInput, @Ctx() ctx: Context) {
    const { email, password, name } = data

    const hash = await bcrypt.hash(password, 10)

    return await ctx.prisma.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    })
  }
}
