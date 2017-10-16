import { PubSub } from "graphql-subscriptions";
import { withFilter } from "graphql-subscriptions";
import * as faker from "faker";

const channels: any[] = [];
let lastChannelId: number = 0;
let lastMessageId: number = 0;
let messageCreatedAt: number = 123456789;

function addChannel(name: any): number {
	lastChannelId++;
	const newChannel: any = {
		id: String(lastChannelId),
		name: name,
		messages: [],
	};
	channels.push(newChannel);
	return lastChannelId;
}

function getChannel(id: any): void {
	return channels.filter(channel => channel.id === id)[0];
}

function addFakeMessage(channel: any, messageText: any): void {
	lastMessageId++;
	messageCreatedAt++;
	const newMessage: any = {
		id: lastMessageId,
		createdAt: messageCreatedAt,
		text: messageText,
	};
	channel.messages.push(newMessage);
}

// use faker to generate random messages in faker channel
addChannel("faker");
const fakerChannel: any = channels.filter(channel => channel.name === "faker")[0];

// add seed for consistent random data
faker.seed(9);
for (let i: number = 0; i < 50; i++) {
	addFakeMessage(fakerChannel, faker.random.words());
}

// generate second channel for initial channel list view
addChannel("channel2");

const pubsub: any = new PubSub();

export const resolvers: any = {
	Query: {
		channels: () => {
			return channels;
		},

		test: () => {
			return new Promise<any>(resolve => setTimeout(x => {
				console.log("aaaa");
				resolve({
					info: "tesst data",
				});
			}, 1000));
		},

		channel: (root: any, { id }: any) => {
			return getChannel(id);
		},
	},
	Channel: {
		name: () => {
			return new Promise<any>(resolve => setTimeout(x => {
				resolve("EZEKI");
			}, 3000));
		},
		// messages: () => {
		// 	return [{
		// 		id: 1,
		// 		text: "String",
		// 		createdAt: Date.now
		// 	}];
		// }
	},
	Message: {
		createdAt: () => Date.now()
	},
	Mutation: {
		addChannel: (root: any, args: any) => {
			const name: string = args.name;
			const id: number = addChannel(name);
			return getChannel(id);
		},
		addMessage: (root: any, { message }: any) => {
			const channel: any = channels.filter(
				channel => channel.id === message.channelId
			)[0];
			if (!channel) {
				throw new Error("Channel does not exist");
			}

			const newMessage: any = {
				id: String(lastMessageId++),
				text: message.text,
				createdAt: +new Date(),
			};
			channel.messages.push(newMessage);

			pubsub.publish("messageAdded", {
				messageAdded: newMessage,
				channelId: message.channelId,
			});

			return newMessage;
		},
	},
	Subscription: {
		messageAdded: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("messageAdded"),
				(payload, variables) => {
					// the `messageAdded` channel includes events for all channels, so we filter to only
					// pass through events for the channel specified in the query
					return payload.channelId === variables.channelId;
				}
			),
		},
	},
};
