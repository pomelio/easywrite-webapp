const ActionTypes = {
	INIT_SPACE: 'INIT_SPACE',
	SET_SPACE_LOADING: 'SET_SPACE_LOADING',
	LOAD_ARTICLES : 'LOAD_ARTICLES',
	
	INIT_ARTICLE: 'INIT_ARTICLE',
	RESET_ARTICLE: 'RESET_ARTICLE',
	SHOW_BIG_PICTURE: 'SHOW_BIG_PICTURE',
};
const ChangeEvent = 'change';

const DEBUG = true;
const WEB_ROOT = DEBUG ? 'http://jay.veryveryhard.com' : '';


const ObjectType = {
	TYPE_ARTICLE: 'ARTICLE',
	TYPE_SPACE: 'SPACE',
	TYPE_USER: 'USER',
};

module.exports = {
	DEBUG,
	ChangeEvent,
	ActionTypes,
	ObjectType,
	WEB_ROOT,
};
