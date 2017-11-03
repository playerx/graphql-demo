import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	options = {
		position: ['bottom', 'left'],
		timeOut: 3000,
		maxStack: 4,
		showProgressBar: true,
		pauseOnHover: true,
		clickToClose: true
	};

	constructor() {
	}

	// ngOnInit() {
	// 	this.apollo
	// 		.subscribe({ query: onLoanAdd })
	// 		.takeUntil(this.dispose$)
	// 		.subscribe(x => {
	// 			this.notify.info('Loan created', `New loan is created with amount: ${this.currency.transform(x.newItem.amount, 'USD', true)}`);
	// 			this.refresh(null, true);
	// 		});
	// }
}
