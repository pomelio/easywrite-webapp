
// @flow

import {
	WEB_ROOT,
} from './Constants';

//const API_URL = 'http://192.168.1.5:8080';

export function fetchSpace(spaceID: string) : Promise {
    return fetch(WEB_ROOT + '/1/webapi/space/' + spaceID).then(resp => {
       return resp.json();
    }).then(json => {
       return json;
    });
}

export function fetchSpaceByHost() : Promise {
    return fetch(WEB_ROOT + '/1/webapi/host').then(resp => {
       return resp.json();
    }).then(json => {
       return json;
    });
}


export function fetchArticle(articleID: string) : Promise {
    return fetch(WEB_ROOT + '/1/webapi/article/' + articleID).then(resp => {
       return resp.json();
     });
}

export function fetchArticles(spaceID: string, offset: number) : Promise {
    return fetch(WEB_ROOT + '/1/webapi/space/' + spaceID + '/articles/' + offset).then(resp => {
       return resp.json();
    });
}


export default {
    fetchSpace,
    fetchSpaceByHost,
    fetchArticle,
    fetchArticles,
}