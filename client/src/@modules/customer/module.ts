import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreConfigService } from 'angular-redux-dynamic-modules';

import { UserService } from './services/user.service';
import { Actions } from './store/actions';
import { InitialState } from './store/state';
import { reducer } from './store/reducer';
import { Epics } from './store/epics';
import { routes } from './routes';

import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from 'app/common/material.module';


@NgModule({
	declarations: [
		ListComponent
	],
	exports: [],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule.forChild(routes)
	],
	providers: [Actions, UserService, Epics, CurrencyPipe],
})
export class Module {

	constructor(
		storeConfig: StoreConfigService,
		epics: Epics
	) {

		// Register State
		storeConfig.addModule(
			'Customer',
			InitialState,
			reducer,
			[epics]
		);

	}
}
