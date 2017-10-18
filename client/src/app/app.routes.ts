import { MainComponent } from './components/main/main.component';
import { DebugComponent } from './components/debug/debug.component';


export const appRoutes = [
	{ path: '', component: MainComponent, pathMatch: 'full' },
	{ path: 'debug', component: DebugComponent, pathMatch: 'full' },
	{ path: 'customer', loadChildren: '@modules/customer/module#Module' },
	{ path: 'hr', loadChildren: '@modules/hr/module#HRModule' },
	{ path: 'user', loadChildren: '@modules/user/module#UserModule' },
];
