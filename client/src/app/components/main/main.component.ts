import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Dispatcher } from 'angular-redux-dynamic-modules';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import * as user from '@modules/user';
import * as hr from '@modules/hr';

const CurrentUserForProfile = gql`
query CurrentUserForProfile {
	customers(take: 10) {
	  id
	  name
	}
  }
`;


const CustomerCreateSubscription = gql`
subscription CustomerCreateSubscription {
	loanCreated {
		id
		name
	}
}
`;

interface QueryResponse {
	id;
	name;
}





@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	title = 'main';


	constructor(
		private store: Dispatcher<hr.PublicAction | user.PublicAction>,
		private apollo: Apollo
	) { }


	ngOnInit() {
		this.apollo.subscribe({
			query: CustomerCreateSubscription
		}).subscribe(x => {
			console.log('CustomerCreateSubscription', x);
		});
	}

	loadHRList() {
		// this.store.dispatch({
		// 	type: hr.ActionType.LoadList,
		// 	filterName: '',
		// 	filterSurname: ''
		// });

		this.apollo.query<QueryResponse>({
			query: CurrentUserForProfile,
		}).subscribe(x => {
			console.log(x);
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
