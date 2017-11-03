import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCache } from 'apollo-cache-inmemory';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { environment } from 'environments/environment';

// Polyfill fetch
// import 'whatwg-fetch';

// interface Result {
// 	id?: string;
// 	__typename?: string;
// }

// const wsClient = new SubscriptionClient(`ws://${environment.graphqlDomain}/subscriptions`, {
// 	reconnect: true,
// });

// const networkInterface = createBatchingNetworkInterface({
// 	uri: `http://${environment.graphqlDomain}/graphql`,
// 	batchInterval: 10,
// 	opts: {
// 		credentials: 'same-origin',
// 	}
// });

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
// 	networkInterface,
// 	wsClient,
// );


// declare var window: any;

// const httpLink = new HttpLink({
// 	uri: `http://${environment.graphqlDomain}/graphql`,
// });

// const client = new ApolloClient({
// 	link: httpLink,
// 	cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
// });
// // const client = new ApolloClient({
// // 	link: httpLink,
// // 	cache: new InMemoryCache({
// // 		addTypename: true,
// // 	}),
// // });

// export function provideClient(): ApolloClient<NormalizedCache> {
// 	return client;
// }
