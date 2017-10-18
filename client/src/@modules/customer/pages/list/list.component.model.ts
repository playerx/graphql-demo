import gql from 'graphql-tag';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';


export const query = gql`
query CurrentUserForProfile($skip: Int, $take: Int) {
	items: customers(skip: $skip, take: $take) {
		id
		name
		loansCount
	}

	totalCount: customersCount
}
`;






export class ListDataSource<T> extends DataSource<any> {

	constructor(private dataStream: Observable<T[]>) {
		super();
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<T[]> {
		console.log('aaaa');
		return this.dataStream;
	}

	disconnect() { }
}
