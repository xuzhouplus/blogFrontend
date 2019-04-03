export const setUserAction = 'setUser';

export const unsetUserAction = 'unsetUser';

export const setUser = (user) => {
	return {
		type: setUserAction,
		payload: user
	};
};

export const unsetUser = () => {
	return {
		type: unsetUserAction
	}
};
