import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';


export const query = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		hello: {
			type: GraphQLString,
			resolve() {
				return 'world';
			}
		},

		hello2: {
			type: GraphQLString,
			resolve() {
				return 'world';
			}
		}
	}
});
