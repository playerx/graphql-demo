import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';


export const mutation = new GraphQLObjectType({
	name: 'RootMutationType',
	fields: {
		hello: {
			type: GraphQLString,
			resolve() {
				return 'world';
			}
		}
	}
});
