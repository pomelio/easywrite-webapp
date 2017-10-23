/* @flow weak */


import {
	ActionTypes,
} from '../Constants';

import Types from '../Types';

var initialState = {
	space : null,
	noMore: false,
	articles : [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.INIT_SPACE:
			return onInit(state, action.space);
		case ActionTypes.LOAD_ARTICLES:
			return onLoadArticles(state, action.noMoreArticles, action.articles);
		default:
			return state;
	}
};

function onInit(state, space) {
	return {...state, space};
}

function onLoadArticles(state, noMore: boolean, oldArticles : Types.Articles) {
	let articles = state.articles.filter(s => !oldArticles.find(ss => ss.id === s.id));
	articles = articles.concat(oldArticles);
	return {...state, noMore, articles};
}

