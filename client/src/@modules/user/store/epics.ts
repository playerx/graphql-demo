import { Injectable } from '@angular/core';
import { Action, ActionType } from './actions';
import { ActionsObservable } from 'redux-observable';
import { Epic } from 'angular-redux-dynamic-modules';
import { of } from 'rxjs/observable/of';
import 'rxjs/Rx';

import { UserService } from '../services/user.service';
import { InitialState, State } from './state';


@Injectable()
export class Epics {

	constructor(
		private userService: UserService
	) { }

	@Epic()
	LoadList = (stream: ActionsObservable<Action>) => stream
		.ofType(ActionType.LoadList)
		.switchMap(x => {
			return this.userService.loadList()
				.map(data => (<Action>{ type: ActionType.LoadListSuccess, items: data }))
				.catch(err => of(<Action>{ type: ActionType.LoadListError, error: err }))
				.startWith(<Action>{ type: ActionType.LoadListStarted });
		})

}
