import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { environment } from 'environments/environment';

// Polyfill fetch
import 'whatwg-fetch';

interface Result {
	id?: string;
	__typename?: string;
}

const wsClient = new SubscriptionClient(`ws://${environment.graphqlDomain}/subscriptions`, {
	reconnect: true,
});

const networkInterface = createBatchingNetworkInterface({
	uri: `http://${environment.graphqlDomain}/graphql`,
	batchInterval: 10,
	opts: {
		credentials: 'same-origin',
	}
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
	networkInterface,
	wsClient,
);

const client = new ApolloClient({
	networkInterface: networkInterfaceWithSubscriptions,
});

export function provideClient(): ApolloClient {
	return client;
}
