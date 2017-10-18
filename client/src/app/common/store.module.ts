import { NgModule, Injector, ModuleWithProviders } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter, routerReducer } from '@angular-redux/router';
import { combineReducers, applyMiddleware } from 'redux';
import { storeConfigs, reigsterModules, dynamicEpicMiddleware } from 'angular-redux-dynamic-modules/src/store-config.service';
import { Dispatcher, StoreConfigService } from 'angular-redux-dynamic-modules';
import { provideClient } from './apollo.client';
declare var window: any;

const apolloClient = provideClient();


@NgModule({
	imports: [NgReduxModule, NgReduxRouterModule],
	providers: [StoreConfigService, Dispatcher]
})
export class StoreModule {

	constructor(
		store: NgRedux<any>,
		devTools: DevToolsExtension,
	) {
		storeConfigs['apollo'] = {
			InitialState: {},
			reducer: apolloClient.reducer(),
			epics: []
		};

		const config = reigsterModules();

		const enhancers = [
			applyMiddleware(apolloClient.middleware()),
		];

		if (devTools.isEnabled()) {
			enhancers.push(devTools.enhancer());
		}

		store.configureStore(
			config.reducer,
			config.InitialState,
			[dynamicEpicMiddleware, ...config.epics],
			enhancers);

		if (window.devToolsExtension) {
			window.devToolsExtension.updateStore(store['_store']);
		}
	}
}

