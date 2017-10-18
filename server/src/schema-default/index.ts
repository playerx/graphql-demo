import { GraphQLSchema, buildSchema } from 'graphql';

import { query } from './query';
import { mutation } from './mutation';
import { subscription } from './subscription';


var schema = buildSchema(`
type Query {
  hello: String
}
`);



export const schema = new GraphQLSchema({
	query: query,
	mutation: mutation,
	subscription: subscription,
});
