/* @flow weak */

import {
	ActionTypes,
} from '../Constants';

import Types from '../Types';

var initialState = {
	article: null,
	parts: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.RESET_ARTICLE:
			return onReset(state);
		case ActionTypes.INIT_ARTICLE:
			return onInit(state, action.article);
		case ActionTypes.SHOW_BIG_PICTURE:
			return onShowBigPicture(state, action.photoID);
		default:
			return state;
	}
};


function onInit(state, article: Types.Article) {
	let parts = article.parts.map(part => {
		if (!part.photos) {
			part.photos = [];
		}
		let photos = part.photos.map(photo => {
			return {...photo, width:'small'};
		});
		return {...part, photos};
	});
	return {...state, article, parts};
}

function onReset(state) {
	return {article: null, parts: null};
}

function onShowBigPicture(state, pictureID: string) {
	let flag = false;

	let parts = state.parts.map(part => {
		let photos = part.photos.map(photo => {
			let photoID = photo.id;
			if (photoID !== pictureID) {
				return photo;
			}
			flag = true;
			return {...photo, width:'big'};

		});
		return {...part, photos};
	});

	if (flag) {
		return {...state, parts};
	}
	return state;
}
