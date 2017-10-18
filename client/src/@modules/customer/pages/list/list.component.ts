import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
// import * as loan from '@modules/loan';
import * as user from '@modules/user';
import * as hr from '@modules/hr';
import { Observable } from 'rxjs/Rx';
import { Dispatcher } from 'angular-redux-dynamic-modules';
import { AppState } from 'app/app.state';
import { DataSource } from '@angular/cdk/table';
import { Apollo } from 'apollo-angular';
import { query, ListDataSource } from './list.component.model';



@Component({
	selector: 'user-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	title = 'user-list';

	totalCount: number;
	pageSize = 10;
	pageIndex = 0;

	// @select((x: AppState) => x.Customer.items)
	// items$: Observable<any>;

	dataSource: ListDataSource<any>;

	displayedColumns = ['id', 'name', 'loansCount', 'actions'];


	constructor(
		private store: Dispatcher<hr.PublicAction | user.PublicAction>,
		private apollo: Apollo
	) { }


	ngOnInit() {
		this.refresh();
	}

	refresh(e?) {

		const config = {
			pageIndex: 0,
			pageSize: 10,
			...e
		};

		const result$ = this.apollo.watchQuery<any>({
			query: query,
			variables: {
				skip: config.pageIndex * config.pageSize,
				take: config.pageSize
			}
		});

		const serverItems$ = result$.map(x => {
			this.totalCount = x.data.totalCount;
			return x.data.items;
		});

		this.dataSource = new ListDataSource<any>(serverItems$);
	}
}

