import {setUserAction, unsetUserAction} from "./Action";

const initialState = {
	user: {}
};

const initialAction = {
	type: 'init'
};

export const userReducer = function (state = initialState, action = initialAction) {
	console.log(state);
	console.log(action);
	switch (action.type) {
		case setUserAction:
			return {
				...state,
				user: action.payload
			};
		case unsetUserAction:
			return {
				...state,
				user: {}
			};
		default:
			return state;
	}
};