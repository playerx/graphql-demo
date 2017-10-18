import { ActionType, Action } from './actions';
import { InitialState, State } from './state';


export function reducer(state = InitialState, action: Action): State {
	switch (action.type) {
		case ActionType.LoadList:
			console.log('HR ActionType.LoadList REDUCER');
			return state;

		case ActionType.LoadListSuccess:
			return { ...state, list23232: action.items };

		default:
			return state;
	}
}
