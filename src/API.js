
// @flow

import {
	WEB_ROOT,
} from './Constants';

//const API_URL = 'http://192.168.1.5:8080';

function setAuthToken(headers, token: Types.User) {
	if (token) {
		headers.Authorization = ' Bearer ' + token;
	}
}

export function fetchSpace(spaceID: string) : Promise {
    return getAPI(WEB_ROOT + '/1/webapi/space/' + spaceID).then(resp => {
       return resp.json();
    }).then(json => {
       return json;
    });
}

export function fetchSpaceByHost() : Promise {
    return getAPI(WEB_ROOT + '/1/webapi/host').then(resp => {
       return resp.json();
    }).then(json => {
       return json;
    });
}


export function fetchArticle(articleID: string) : Promise {
    return getAPI(WEB_ROOT + '/1/webapi/article/' + articleID).then(resp => {
       return resp.json();
     });
}

export function fetchArticles(spaceID: string, offset: number) : Promise {
    return getAPI(WEB_ROOT + '/1/webapi/space/' + spaceID + '/articles/' + offset).then(resp => {
       return resp.json();
    });
}

export function fetchTranslates(contentID: string) : Promise {
    return getAPI(WEB_ROOT + '/1/webapi/translates/' + contentID).then(resp => {
       return resp.json();
    });
}

export function fetchTranslateFeedbacks(translateID: string) : Promise {
    return getAPI(WEB_ROOT + '/1/webapi/translateFeedbacks/' + translateID).then(resp => {
       return resp.json();
    });
}


export function fetchTicket() : Promise {
    return getAPI(WEB_ROOT + '/1/webapi/ticket').then(resp => {
       return resp.json();
    });
}

export function signIn(email: string ,pwd: string, token: string) : Promise {
	let data = {email, pwd};
	let exheaders = {};
	setAuthToken(exheaders, token);
	return postAPI(WEB_ROOT + '/1/webapi/auth/sign_in', data, exheaders).then(resp => {
       return resp.json();
    });
}


export function signUp(data, token: string) : Promise {
	//id,spaceID,accessToken,createTime
	let exheaders = {};
	setAuthToken(exheaders, token);
	return postAPI(WEB_ROOT + '/1/webapi/auth/sign_up', data, exheaders).then(resp => {
       return resp.json();
    });
}

export function saveTranslate(contentID: string, content: string, token: string) : Promise {
	let data = {contentID, content};
	let exheaders = {};
	setAuthToken(exheaders, token);
	return postAPI(WEB_ROOT + '/1/webapi/secure/translate/save', data, exheaders).then(resp => {
       return resp.json();
    });
}

export function saveTranslateFeedback(translateID: string, star: number, content: string, token: string) : Promise {
	let data = {translateID, star};
	if (content) {
		data.content = content;
	}
	let exheaders = {};
	setAuthToken(exheaders, token);
	return postAPI(WEB_ROOT + '/1/webapi/secure/translateFeedback/save', data, exheaders).then(resp => {
       return resp.json();
    });
}


function postAPI(url, data, exheaders) {
	return postJSON(url, data, exheaders).then(resp => {
		if (resp.ok) {
			return resp.json().then(val => {
				return val;
			});
		} else {
			return wrapErrorResponse(resp);
		}
	});
}

function getAPI(url , exheaders) {
	return getJSON(url, exheaders).then(resp => {
		if (resp.ok) {
			return resp.json().then(val => {
				return val;
			});
		} else {
			return wrapErrorResponse(resp);
		}
	});
}


var API_TIMEOUT = 30000;

function postJSON(url : string, obj : Object, exheaders: Object, timeout: number = API_TIMEOUT) : Promise {

	return new Promise((resolve, reject) => {

		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		};

		if (exheaders) {
			headers = {...headers, ...exheaders};
		}

		let flag = false;
		fetch(url,
			{
				method: 'post',
				headers,
				body: JSON.stringify(obj)
			}).then(resp => {
				resolve(resp);
			}).catch(err => {
				reject(err);
			});
		setTimeout(() => {
			if (!flag) {
				flag = true;
				reject({message:'ER_TIME_OUT', data: {url, payload:obj, headers: exheaders}});
			}
		}, timeout);
	});

}

function getJSON (url : string, exheaders: Object, timeout: number = API_TIMEOUT ) : Promise {

	return new Promise((resolve, reject) => {
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		};
		if (exheaders) {
			if (exheaders) {
				headers = {...headers, ...exheaders};
			}
		}
		let flag = false;
		fetch(url,{
			headers,
		}).then(resp => {
			flag = true;
			resolve(resp);
		}).catch(err => {
			flag = true;
			reject(err);
		});
		setTimeout(() => {
			if (!flag) {
				flag = true;
				reject({message:'ER_TIME_OUT', data:{url, headers: exheaders}});
			}
		}, timeout);

	});
}

function wrapErrorResponse(resp) {
	if (resp.status === 422) {
		return resp.json().then(data => {
			if (data.errors && data.errors.length > 0) {
				let err = data.errors[0].msg;
				throw err;
			}
			let err = 'ER_PARAM';
			throw err;
		});
	}
	return resp.json().then(data => {
		if (data.statusCode === 401 && data.message === 'Invalid token') {
			let error = 'ER_INVALID_TOKEN';
			throw error;
		}
		if (data.error) {
			let error = data.error;
			throw error;
		}
		let error = 'ER_Error';
		throw error;
	});
}

export default {
    fetchSpace,
    fetchSpaceByHost,
    fetchArticle,
    fetchArticles,
    fetchTicket,
    fetchTranslates,
    fetchTranslateFeedbacks,
    signIn,
    signUp,
    translate,
    saveTranslate,
    saveTranslateFeedback,
    deleteTranslate,
    deleteTranslateFeedback,
}