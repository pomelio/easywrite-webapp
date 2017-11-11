import { combineReducers } from 'redux';
import article from './Article';
import space from './Space';
import session from './Session';

export default combineReducers({
	article,
	space,
	session,
});

export const getArticle = state => {
	return state.article;
};

export const getSpace = state => {
	return state.space;
};

export const getSpaceArticle = (state, id) => {
	let articles =  state.space && state.space.articles || [];
	return articles.find(a => a.id === id);
};

export const getSession = state => {
	return state.session;
};

export const getCookieAuth = state => {
	return state.session.cookieAuth;
}
