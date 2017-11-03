import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import * as fs from "fs";

import { resolvers } from "./resolvers";

const typeDefs: any = fs.readFileSync(__dirname + "/schema.gql").toString();

const schema: any = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
