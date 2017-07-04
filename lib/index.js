const Rx = require('rxjs/Rx');
const {MapNodeFound, parentNodeMap, getNodeMapped, childAtNodeMap}  = require('./pine');
const _gis = this;

const init = () =>{
	const requestStream = Rx.Observable.ajax('./demo/file.json')
	.map(e => e.response);
	const htmlSubscription = requestStream.subscribe(res => {
		////aki llega la continuidad de busquedas en objetos
		var f = MapNodeFound('pre')(res, (o)=>{
			
			if(o.length>0){
				getNodeMapped(parentNodeMap(o[0]), (e)=>{
					console.log(o[0], ' founded', e);
				})(res)
			}
		});
	});
};
init();
