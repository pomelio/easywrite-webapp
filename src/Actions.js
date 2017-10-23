// @flow
import Types from './Types';

const Constants = require('./Constants');
const ActionTypes = Constants.ActionTypes;



function handleError(dispatch, err) {
	console.log('handleError->', err);
}

export const fetchSpace = (spaceID) => (dispatch, getState, api) => {
	return api.fetchSpace(spaceID).then(space => {
		if (space) {
			dispatch(initSpace(space));
			fetchArticlesEx(space.id, 0, dispatch, getState, api);
		} else {
			throw 'ER_ARTICLE_NOT_FOUND';
		}
	}).catch(err => {
		handleError(dispatch, err);
	});
};

export const fetchSpaceByHost = () => (dispatch, getState, api) => {
	return api.fetchSpaceByHost().then(space => {
		if (space) {
			dispatch(initSpace(space));
			fetchArticlesEx(space.id, 0, dispatch, getState, api);
		} else {
			throw 'ER_ARTICLE_NOT_FOUND';
		}
	}).catch(err => {
		handleError(dispatch, err);
	});
};


export const fetchArticle = (articleID) => (dispatch, getState, api) => {
	return api.fetchArticle(articleID).then(spaceArticle => {
		if (spaceArticle) {
			dispatch(initSpace(spaceArticle.space));
			dispatch(initArticle(spaceArticle.article));
		} else {
			throw 'ER_ARTICLE_NOT_FOUND';
		}
	}).catch(err => {
		handleError(dispatch, err);
	});
};

export const fetchArticles = (spaceID, offset) => (dispatch, getState, api) => {
	fetchArticlesEx(spaceID, offset, dispatch, getState, api);
};

function fetchArticlesEx(spaceID, offset, dispatch, getState, api) {
	return api.fetchArticles(spaceID, offset).then(fetchResp => {
		if (fetchResp) {
			dispatch(loadArticles(fetchResp.noMore, fetchResp.articles));
			return fetchResp;
		} else {
			throw 'ER_ARTICLE_NOT_FOUND';
		}
	});
}


export function initSpace(space: Types.Space) {
	let type = ActionTypes.INIT_SPACE;
	return {
		type,
		space,
	};
}


export function setSpaceLoading(isLoading: boolean) {
	let type = ActionTypes.SET_SPACE_LOADING;
	return {
		type,
		isLoading,
	};
}


export function loadArticles(noMore: boolean, articles: Array<Types.Article>) {
	let type = ActionTypes.LOAD_ARTICLES;
	return {
		type,
		noMore,
		articles,
	};
}

export function initArticle(article: Types.Article) {
	let type = ActionTypes.INIT_ARTICLE;
	return {type, article};
}

export function resetArticle() {
	let type = ActionTypes.RESET_ARTICLE;
	return {type};
}

export function showBigPicture(photoID: string) {
	let type = ActionTypes.SHOW_BIG_PICTURE;
	return {type, photoID};
}