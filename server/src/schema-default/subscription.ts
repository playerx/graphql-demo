import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';


export const subscription = new GraphQLObjectType({
	name: 'RootSubscriptionType',
	fields: {
		hello: {
			type: GraphQLString,
			resolve() {
				return 'world';
			}
		}
	}
});
