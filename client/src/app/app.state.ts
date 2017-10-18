import { State as HRState } from '@modules/hr';
import { State as UserState } from '@modules/user';
import { State as CustomerState } from '@modules/customer';

export interface AppState {
	HR: HRState;
	User: UserState;
	Customer: CustomerState;
}
