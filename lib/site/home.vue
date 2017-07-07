<style>
  .founded{
    text-align: center;
  }
</style>

<template>
  <div  class="row">
  	<div class="row">
  		<div class="col-md-8 col-md-offset-4">
	  		<h1>{{msg}}</h1>
	  	</div>
  	</div>
    <div class="row">
      <p class="col-md-8 col-md-offset-4 founded" v-if="founded">{{founded}}</p>
    </div>
  	<node-map-tree :tree="$data" v-if="data" >NAL</node-map-tree>
  	<node-map-search v-on:inputChanged="refreshSearch" v-if="data"/>
  </div>
</template>

<script type="text/babel">
const nodeMapSearch = require('./components/nodeMapSearch.jsx'),
	nodeMapTree= require('./components/Tree.vue'),
	Rx = require('rxjs/Rx'),
  {MapNodeFound, parentNodeMap, getNodeMapped, childAtNodeMap}  = require('./../pine');
module.exports = {
  components: {
    nodeMapTree: nodeMapTree
  },
	mounted() {
		var _this = this;
    const requestStream = Rx.Observable.create((observer) => {
      var req = new XMLHttpRequest();
      req.open('GET', './../demo/file.json');
      req.onload = () => {
        if (req.status == 200) {
          observer.next(JSON.parse(req.response));
          observer.complete();
        } else {
          observer.error(req.statusText);
        }
      };
      req.onerror = () => {
        observer.error(new Error("Unkown Error"));
      }
      req.send();
    });
    requestStream.subscribe({
      next: (e)=>{
        _this.data  = e;
      },
      error: ()=>{

      },
      complete:() => {

      }
    });
	},
  	data () {
    	return {
    		data: null,
        founded: 'aun no ',
    		onData: false,
      		msg: 'Func Pine',
      		searched: false,
      		search: null
    	}
  	},
  	methods: {
  		refreshSearch(value){
        var _this = this;
  			var f = MapNodeFound(value)(this.data, (o)=>{
          
    				if(o.length>0){
              _this.founded = o[0];
              console.log(o[0],' hemos encontr');
    					// getNodeMapped(parentNodeMap(o[0]), (e)=>{
                
                
    					// })(this.data)
    				}
  			 });
  		}
  	}
}
</script>