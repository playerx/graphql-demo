import { PubSub } from "graphql-subscriptions";
import { withFilter } from "graphql-subscriptions";
import GraphQLJSON from './scalars/json';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from './scalars/datetime';
import { db } from './db';


const pubsub: any = new PubSub();

export const resolvers: any = {
	JSON: GraphQLJSON,
	Date: GraphQLDate,
	Time: GraphQLTime,
	DateTime: GraphQLDateTime,

	Query: {
		customers: (_: any, { skip = 0, take = 10 }) =>
			db.Customers.sort((a, b) => b.id - a.id).slice(skip, skip + take).map(x => {
				x.loansCount = x.loans ? x.loans.length : 0;
				x.loansAmount = (x.loans || []).reduce((r, x) => r + x.amount, 0);
				return x;
			}),

		customersCount: () => db.Customers.length,

		customer: (_: any, obj: any) => {

			return db.Customers.filter(x => x.id == obj.id)[0];
		}
	},

	Customer: {
		__resolveType(obj: any, context: any, info: any) {

			if (obj.registrationNumber) {
				return 'JuridicalCustomer';
			}

			if (obj.age) {
				return 'PhysicalCustomer';
			}

			return null;
		},
	},

	PhysicalCustomer: {

		loans: (_: any, obj: any) => {
			return db.Customers.filter(x => x.id == obj.id)[0];
		}
	},

	Mutation: {

		customerCreatePhysical: (root: any, args: any) => {
			const name: string = args.name;
			const newItem = {
				id: db.Customers.length + 1,
				name: name,
				loans: [],
				loansCount: 0,
				loansAmount: 0,
				firstName: name,
				lastName: name,
				age: 22
			};

			db.Customers.push(newItem);

			pubsub.publish("customerCreated", {
				customerCreated: newItem
			});

			return newItem
		},

		customerCreateJuridical: (root: any, args: any) => {
			const name: string = args.name;
			const newItem = {
				id: db.Customers.length + 1,
				name: name,
				loans: [],
				loansCount: 0,
				loansAmount: 0,
				registrationNumber: name,
				contactPersons: []
			};

			db.Customers.push(newItem);

			pubsub.publish("customerCreated", {
				customerCreated: newItem
			});

			return newItem
		},

		loanCreate: (root: any, args: any) => {
			const customerId: number = args.customerId;
			const name: string = args.name;
			const amount: number = args.amount;

			const customer = db.Customers.filter(x => x.id == customerId)[0];
			if (!customer)
				throw new Error(`Customer (${customerId}) does not exist`);


			customer.loans = customer.loans || [];

			const newLoan = {
				id: customer.loans.length + 1,
				name: name,
				amount: amount
			};

			customer.loans.push(newLoan);

			const customerInfo = {
				customerId: customerId
			};

			pubsub.publish("loanCreated", {
				loanCreated: newLoan
			});

			return newLoan;
		},
	},

	Subscription: {
		customerCreated: {
			subscribe: () => {
				console.log('aa');
				return pubsub.asyncIterator("customerCreated")
			},
		},

		loanCreated: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("loanCreated"),
				(payload, variables) => {
					// the `messageAdded` channel includes events for all channels, so we filter to only
					// pass through events for the channel specified in the query
					return true;
				}
			),
		},
	},
};
