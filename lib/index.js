//import Rx from 'rxjs/Rx';
//import {isPath} from './pine';
const Rx = require('rxjs/Rx');
const {isPath, search}  = require('./pine');
const _gis = this;

const init = () =>{
	const requestStream = Rx.Observable.ajax('./demo/file.json')
	.map(e => e.response);
	const htmlSubscription = requestStream.subscribe(res => {
		console.log(res, ' uoio');
		////aki llega la continuidad de busquedas en objetos
		var f = search(12).data(res);
		console.log(f);
	});
};
init();
