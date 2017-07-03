import Rx from 'rxjs/Rx';
//import {isPath} from './pine';

const init = () =>{
	const requestStream = Rx.Observable.ajax('./demo/file.json')
	.map(e => e.response);
	const htmlSubscription = requestStream.subscribe(res => {
		console.log(JSON.stringify(res, null, 2));
	});
};
init();
