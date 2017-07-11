<style>
.pre-title{
   background:#DAE1EA;
}
.title{
  font-family: Verdana;
  color:#2A437F;
  text-align: center;
}
.upload{
  margin-top: 20px;
}
</style>

<template>
  <div  class="row">
  	<div class="row pre-title">
  		<div class="col-md-6 col-md-offset-2 title">
	  		<h1>{{msg}}</h1>
	  	</div>
      <div class="col-md-2 col-md-offset-1">
        <button type="button" class="btn btn-primary upload" aria-label="Left center">
          <span class="glyphicon glyphicon-file" aria-hidden="true"></span> Seleccionar JSON
        </button>
      </div>
  	</div>
    <node-string v-if="founded.length>0" :path="founded" v-on:clickStr="refreshTree"/>
  	<node-map-tree :tree="$data" v-if="data" :path="founded" :strselected="strselected"></node-map-tree>
  	<node-map-search v-on:inputChanged="refreshSearch" v-if="data"/>
  </div>
</template>

<script type="text/babel">
const nodeMapSearch = require('./components/nodeMapSearch.jsx'),
	nodeMapTree = require('./components/Tree.vue'),
  nodeString = require('./components/String.vue'),
	Rx = require('rxjs/Rx'),
  {MapNodeFound, parentNodeMap, pathArray,
    getNodeMapped, childAtNodeMap}  = require('./../pine');
module.exports = {
  components: {
    nodeMapTree: nodeMapTree,
    nodeString: nodeString
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
  watch:{
    founded: (oldval, newval)=>{
      // console.log('home', oldval, newval, this, 'HOME');
    }
  },
	data () {
  	return {
      strselected: {},
  		data: null,
      founded: [],
  		onData: false,
    		msg: 'Func Pine',
    		searched: false,
    		search: null
  	}
	},
	methods: {
    refreshTree(e){
      this.strselected = e;
      //console.log(e);
    },
		refreshSearch(value){
      let _paths = [];
			var f = MapNodeFound(value)(this.data, (o)=>{
  				if(o.length>0){
            for(var i =0; i<o.length; i++){
              _paths.push(pathArray(o[i]));
              // console.log('------------------------------CLEAR----------------------------');
              // console.log(_paths, ' encontrado en el camino');
            }
  				}
			 });
      this.founded =  _paths;//pathArray(o[0]);
		}
	}
}
</script>