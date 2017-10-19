import gql from 'graphql-tag';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';


export const customerList = gql`
query CurrentUserForProfile($skip: Int, $take: Int) {
	items: customers(skip: $skip, take: $take) {
		id
		name
		loansCount
		loansAmount
	}

	totalCount: customersCount
}
`;

export const customerAdd = gql`
mutation addCustomer($name: String!) {
	newItem: customerCreatePhysical(name: $name) {
		id
		name
		loansCount
	}
}
`;

export const loanAdd = gql`
mutation addLoan($customerId: ID!, $name: String, $amount: Float) {
	newItem: loanCreate(customerId: $customerId, name: $name, amount: $amount) {
		id
	}
}
`;

export const onCustomerAdd = gql`
subscription onCustomerAdd {
	newItem: customerCreated {
		id
		name
  }
}
`;

export const onLoanAdd = gql`
subscription onLoanAdd {
	newItem: loanCreated {
		id
		name
		amount
  }
}
`;



export class ListDataSource<T> extends DataSource<any> {

	constructor(private dataStream: Observable<T[]>) {
		super();
	}

	connect(): Observable<T[]> {
		return this.dataStream;
	}

	disconnect() { }
}
