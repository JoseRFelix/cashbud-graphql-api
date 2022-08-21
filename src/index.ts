import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { disconnectPrisma } from "prisma/client";
import resolvers from "./resolvers";
import { buildSchema } from "type-graphql";
import { logError } from "~/utils/logger";
import { GraphQLScalarType } from "graphql";
import { DateTimeResolver } from "graphql-scalars";
import { context } from "./context";

async function main() {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: true,
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  new ApolloServer({ schema, context }).listen({ port: 3005 }, () =>
    console.log(`🚀 Server ready at: http://localhost:3005`)
  );
}

main().catch((error) => {
  logError(error);
  disconnectPrisma();
});
