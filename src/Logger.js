/* @flow */

let {DEBUG} = require('./Constants');

export let log = function(line) {
	console.log(line);
};

export let LOG_ENABLED = DEBUG ? true : false;
