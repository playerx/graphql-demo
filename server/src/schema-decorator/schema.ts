import {
	Schema,
	Query,
	Mutation,
	ObjectType,
	Field,
	GraphQLID,
	GraphQLString
} from 'graphql-schema-decorator';



@Schema()
export class RootSchema {

	@Query()
	answerQuery: AnswerQueries.AnswerQuery;

	@Query()
	answersQuery: AnswerQueries.AnswersQuery;

	@Mutation()
	answerCreateMutation: AnswerMutations.AnswerCreateMutation;

	@Mutation()
	answerUpvoteMutation: AnswerMutations.AnswerUpvoteMutation;
}



@ObjectType()
export class Loan {

	@Field({ type: GraphQLID })
	id: number;

	@Field({ type: GraphQLString })
	name: string;

	amount: number;
}

@ObjectType()
export class Customer {
	id: number;
	name: string;
	loans?: Loan[];
}

@ObjectType()
export class ContactPerson {
	id: number
	fullName: string
	mobile: string
}

@ObjectType()
export class JuridicalCustomer extends Customer {
	registrationNumber: String;
	contactPersons?: ContactPerson[];
}

@ObjectType()
export class PhysicalCustomer extends Customer {
	firstName: string;
	lastName: string;
	age: number;
}
