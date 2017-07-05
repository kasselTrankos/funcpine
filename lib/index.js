// const Rx = require('rxjs/Rx');
//import Vue from 'vue';
const Vue = require('vue');
const Home = require('./site/home.vue');
//import Home from './site/home.vue';
/*const {MapNodeFound, parentNodeMap, getNodeMapped, childAtNodeMap}  = require('./pine');

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
};*/
//init();
new Vue({
  	el: '#app',
  	render: function (createElement) {
  		console.log(Home);
    	return createElement(Home)
  	}
});
