<style>

</style>

<template>
  <div  class="row">
  	<div class="row">
  		<div class="col-md-8 col-md-offset-4">
	  		<h1>{{msg}}</h1>
	  	</div>
  	</div>
  	<div class="row" v-if="searched">
	  	<div class="col-md-10 col-md-offset-2">

	  	</div>
  	</div>
  	<node-map-search v-on:inputChanged="refreshSearch"/>

  </div>
</template>

<script>
const nodeMapSearch = require('./components/nodeMapSearch.jsx');
const Rx = require('rxjs/Rx');
const {MapNodeFound, parentNodeMap, getNodeMapped, childAtNodeMap}  = require('./../pine');
module.exports = {
	mounted() {
		var _this = this;
		const requestStream = Rx.Observable.ajax('./../demo/file.json')
		.map(e => e.response);
		const htmlSubscription = requestStream.subscribe(res => {
			var f = MapNodeFound('pre')(res, (o)=>{
				_this.searched = true;
				console.log('arranbg');
				if(o.length>0){
					getNodeMapped(parentNodeMap(o[0]), (e)=>{
						console.log(o[0], ' founded', e);
					})(res)
				}
			});
		});
	},
  	data () {
    	return {
      		msg: 'Map Node',
      		searched: false,
      		search: null
    	}
  	},
  	methods: {
  		refreshSearch(value){
  			console.log(' no data??????', value);
  		}
  	}
}
</script>