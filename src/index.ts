import "reflect-metadata"
require("dotenv").config()

import { ApolloServer } from "apollo-server"
import { GraphQLScalarType } from "graphql"
import { DateTimeResolver } from "graphql-scalars"
import { disconnectPrisma } from "prisma/client"
import { buildSchema } from "type-graphql"

import { logError } from "~/utils/logger"

import { context } from "./context"
import resolvers from "./resolvers"
import { customAuthChecker } from "./utils/auth"

async function main() {
  const schema = await buildSchema({
    resolvers,
    authChecker: customAuthChecker,
    emitSchemaFile: true,
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  })

  new ApolloServer({ schema, context }).listen({ port: 3005 }, () =>
    console.log(`🚀 Server ready at: http://localhost:3005`)
  )
}

main().catch(error => {
  logError(error)
  disconnectPrisma()
})
