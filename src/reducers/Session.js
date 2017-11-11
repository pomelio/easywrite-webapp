/* @flow weak */


import {
	ActionTypes,
} from '../Constants';

import Types from '../Types';

var initialState = {
	cookieAuth: null,
	user: null,
	lat: 0,
	lng: 0,
	isLoading: false,
	settings: {
		autoSync:true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.COOKIE_AUTH:
			return onSetCookieAuth(state, action.cookieAuth);
		case ActionTypes.SET_LOADING:
			return onSetLoading(state, action.isLoading);
		case ActionTypes.SET_SESSION_SETTINGS:
			return onSetSettings(state, action.settings);
		case ActionTypes.SET_SESSION_USER:
			return onSetUser(state, action.user);
		default:
			return state;
	}
};

function onSetUser(state, user: Types.User) {
	return {...state, user};
}

function onSetSettings(state, settings: Types.Settings) {
	return {...state, settings};
}

function onSetLoading(state, isLoading: boolean) {
	return {...state, isLoading};
}

function onSetCookieAuth(state, cookieAuth: string) {
	return {...state, cookieAuth};
}
