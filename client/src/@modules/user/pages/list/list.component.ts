import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
// import * as loan from '@modules/loan';
import * as user from '@modules/user';
import * as hr from '@modules/hr';
import { Observable } from 'rxjs/Rx';
import { Dispatcher } from 'angular-redux-dynamic-modules';
import { AppState } from 'app/app.state';


@Component({
	selector: 'user-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	title = 'user-list';

	@select((x: AppState) => x.User.items)
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
