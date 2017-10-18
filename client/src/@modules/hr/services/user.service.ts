import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserService {

	constructor(
		private http: HttpClient
	) { }

	loadList() {
		console.log('HTTP Request');
		return this.http.get('http://x.jok.io/music/channel/list');

		// return Observable.of([
		// 	{ name: 'Item 1' },
		// 	{ name: 'Item 2' },
		// 	{ name: 'Item 3' },
		// ]);
	}
}
