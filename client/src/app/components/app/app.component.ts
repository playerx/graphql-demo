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

}
