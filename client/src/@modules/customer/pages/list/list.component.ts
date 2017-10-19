import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { customerList, customerAdd, ListDataSource, loanAdd, onLoanAdd, onCustomerAdd } from './list.component.model';
import { NotificationsService } from 'angular2-notifications';


@Component({
	selector: 'user-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
	totalCount: number;

	config = {
		pageIndex: 0,
		pageSize: 10
	};

	dataSource: ListDataSource<any>;
	displayedColumns = ['id', 'name', 'loansCount', 'loansAmount', 'actions'];

	dispose$ = new Subject<any>();


	constructor(
		private apollo: Apollo,
		private notify: NotificationsService,
		private currency: CurrencyPipe
	) { }


	ngOnInit() {
		this.apollo
			.subscribe({ query: onLoanAdd })
			.takeUntil(this.dispose$)
			.subscribe(x => {
				this.notify.info(x.newItem.name, `New loan is created with amount: ${this.currency.transform(x.newItem.amount, 'USD', true)}`);
				this.refresh(null, true);
			});

		this.apollo
			.subscribe({ query: onCustomerAdd })
			.takeUntil(this.dispose$)
			.subscribe(x => {
				this.notify.info(x.newItem.name, `New customer is created`);
				this.refresh(null, true);
			});

		this.refresh();
	}

	ngOnDestroy() {
		this.dispose$.next();
		this.dispose$.complete();
	}


	refresh(pageEvent?, forceFromServer = false) {

		this.config = {
			...this.config,
			...pageEvent
		};

		const result$ = this.apollo.watchQuery<any>({
			query: customerList,
			fetchPolicy: forceFromServer ? 'network-only' : 'cache-first',
			variables: {
				skip: this.config.pageIndex * this.config.pageSize,
				take: this.config.pageSize
			}
		});

		const items$ = result$.map(x => {
			this.totalCount = x.data.totalCount;
			return x.data.items;
		});

		this.dataSource = new ListDataSource<any>(items$);
	}

	addCustomer() {
		this.apollo.mutate({
			mutation: customerAdd,
			variables: {
				name: 'Ezeki ' + Date.now()
			}
		}).subscribe();
	}

	addLoan(customerId) {
		this.apollo.mutate({
			mutation: loanAdd,
			variables: {
				customerId: customerId,
				name: 'My Loan',
				amount: 222
			}
		}).subscribe();
	}
}

