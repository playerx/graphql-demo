import { graphql, buildSchema } from 'graphql';
import * as graphqlHTTP from 'express-graphql';
import * as fs from "fs";
import { resolvers } from './resolvers';


// const typeDefs: any = fs.readFileSync(__dirname + "/schema.gql").toString();
var typeDefs = `
type Query {
  hello: String
}
`;

export const schema = graphqlHTTP({
	schema: buildSchema(typeDefs),
	rootValue: resolvers,
	graphiql: true,
});
