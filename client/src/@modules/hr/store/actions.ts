
import { Injectable } from '@angular/core';
import { ActionsBase } from 'angular-redux-dynamic-modules';

export enum ActionType {
	LoadList = '[HR] LoadList',
	LoadListStarted = '[HR] LoadListStarted',
	LoadListSuccess = '[HR] LoadListSuccess',
	LoadListError = '[HR] LoadListError',
}

export type PublicAction
	= { type: ActionType.LoadList, filterName: string, filterSurname: string }
	| { type: ActionType.LoadListStarted }
	| { type: ActionType.LoadListSuccess, items: any[] }
	| { type: ActionType.LoadListError, error: any };


export type Action
	= { type: 'Test' }
	| { type: 'Test2' }
	| PublicAction;


@Injectable()
export class Actions extends ActionsBase<PublicAction> { }
