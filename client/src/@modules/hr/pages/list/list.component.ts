import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Dispatcher } from 'angular-redux-dynamic-modules';
import * as user from '@modules/user';
import * as hr from '@modules/hr';
import { Observable } from 'rxjs/Rx';


@Component({
	selector: 'hr-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	title = 'hr-list';

	items$: Observable<any>;

	constructor(
		private store: Dispatcher<hr.PublicAction | user.PublicAction>
	) { }

	ngOnInit() {
	}

	loadHRList() {
		this.store.dispatch({
			type: hr.ActionType.LoadList,
			filterName: '',
			filterSurname: ''
		});
	}

	loadUserList() {
		this.store.dispatch({
			type: user.ActionType.LoadList,
			filterName: '',
			filterSurname: ''
		});
	}
}
