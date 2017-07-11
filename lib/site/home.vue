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
.btn-file {
    position: relative;
    overflow: hidden;
}
.btn-file input[type=file] {
    position: absolute;
    border: 3px solid red;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    z-index: 1000;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
}
</style>

<template>
  <div  class="row">
  	<div class="row pre-title">
  		<div class="col-md-6 col-md-offset-2 title">
	  		<h1>{{msg}}</h1>
	  	</div>
      <div class="col-md-2 col-md-offset-1">
        <span type="file" class="btn btn-primary btn-file upload" aria-label="Left center">
          <input type="file" v-on:change="onFileChange"><span class="glyphicon glyphicon-file" aria-hidden="true"></span> Seleccionar JSON
        </span>
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
    onFileChange(e){
      console.log(e);
    },
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