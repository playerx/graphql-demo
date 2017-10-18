import { PubSub } from "graphql-subscriptions";
import { withFilter } from "graphql-subscriptions";
import { db } from './db';


const pubsub: any = new PubSub();

export const resolvers: any = {
	Query: {
		customers: (_: any, { skip = 0, take = 10 }) => {
			console.log('aaa');

			return db.Customers.slice(skip, skip + take);
		},

		customer: (_: any, obj: any) => {

			return db.Customers.filter(x => x.id == obj.id)[0];
		}
	},

	// Customer: {
	// 	__resolveType(obj: any, context: any, info: any) {

	// 		if (obj.registrationNumber) {
	// 			return 'JuridicalCustomer';
	// 		}

	// 		if (obj.age) {
	// 			return 'PhysicalCustomer';
	// 		}

	// 		return null;
	// 	},
	// },

	Mutation: {

		customerCreatePhysical: (root: any, args: any) => {
			const name: string = args.name;
			const newItem = {
				id: db.Customers.length + 1,
				name: name,
				loans: [],
				firstName: name,
				lastName: name,
				age: 22
			};

			db.Customers.push(newItem);

			return newItem
		},

		customerCreateJuridical: (root: any, args: any) => {
			const name: string = args.name;
			const newItems = {
				id: db.Customers.length + 1,
				name: name,
				loans: [],
				registrationNumber: name,
				contactPersons: []
			};

			db.Customers.push(newItems);

			return newItems
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

			pubsub.publish("loanCreated", {
				loanCreated: newLoan,
				// channelId: message.channelId,
			});

			return newLoan;
		},
	},

	Subscription: {
		customerCreated: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("messageAdded"),
				(payload, variables) => {
					// the `messageAdded` channel includes events for all channels, so we filter to only
					// pass through events for the channel specified in the query
					return payload.channelId === variables.channelId;
				}
			),
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
