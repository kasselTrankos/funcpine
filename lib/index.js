const Rx = require('rxjs/Rx');
const Vue = require('vue');
const Home = require('./site/home');
//import home from './site/home';
const {MapNodeFound, parentNodeMap, getNodeMapped, childAtNodeMap}  = require('./pine');

const init = () =>{
	const requestStream = Rx.Observable.ajax('./demo/file.json')
	.map(e => e.response);
	const htmlSubscription = requestStream.subscribe(res => {
		var f = MapNodeFound('pre')(res, (o)=>{
			if(o.length>0){
				getNodeMapped(parentNodeMap(o[0]), (e)=>{
					console.log(o[0], ' founded', e);
				})(res)
			}
		});
	});
};
//init();
new Vue({
  el: '#app'
});
