//import Rx from 'rxjs/Rx';
//import {isPath} from './pine';
const Rx = require('rxjs/Rx');
const {isPath}  = require('./pine');
const _gis = this;

const init = () =>{
	const requestStream = Rx.Observable.ajax('./demo/file.json')
	.map(e => e.response);
	const htmlSubscription = requestStream.subscribe(res => {
		console.log(_gis);
		isPath('abs');
	});
};
init();
