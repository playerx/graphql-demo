import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Dispatcher } from 'angular-redux-dynamic-modules';

@Component({
	selector: 'app-debug',
	templateUrl: './debug.component.html',
	styleUrls: ['./debug.component.scss']
})
export class DebugComponent {
	constructor() { }
}
