<style>
	#screen{
		height:40%;
	}
</style>
<template>
  	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div id="screen">
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
const Vue = require('vue');
const parent = require('./nodeMapParent.vue');
const Node = require('./nodeMapElement.vue');
module.exports = {
	mounted(){
		this.parent = Vue.extend(parent)
		this.screen = ge1doot.screen("screen");
		this.setup.length =  Math.max(150, this.screen.height / 4);
		this.drag.x = screen.width  / 2;
		this.drag.y = screen.height / 2;
		this.setMenu(JSON.parse(this.tree.data));
		console.log(this);
	},
	methods: {
		create(){
			//console.log(this.$el);
		},
		setMenu(node, parent){
			if (!(Object.prototype.toString.call( node ) =='[object Array]' ||
				Object.prototype.toString.call( node ) =='[object Object]')) {
				console.log(node);
				parent = new this.parent({
					propsData:{
						parent: parent,
						label: node,
						col:0
					}
				});
				this.nodes.push(parent);

			}else{
				for (var el in  node) {
					if(Object.prototype.toString.call( node ) =='[object Array]' ||
						Object.prototype.toString.call( node ) =='[object Object]'){
						this.setMenu(node[el], parent);
					}
				}
			}

		}
	},
	data(){
		return {
			nodes: [],
			parent: null,
			setup: {
				screen: null,
				friction: 2,
				length: 300,
				reduction: 1.33,
				dotSize: 20,
				rotationSpeed: 0.002,
				collapsedNodeColor: "#fff",
				defaultNodeColor: "#f00",
				expandedNodeColor: "#666",
				line: {color: "#aaa", dasharray: "1,1"},
				defaultNodeStrokeColor: "#aaa",
				overNodeColor: "#f00",
				defaultTextColor: "#888",
				selectedTextColor: "#000",
				textFont: "Abel, tempus sans itc, cursive, Helvetica, sans-serif"
			},
			drag:{
				x:0,
				y:0
			}
		}
	},
	props:{

		tree: {
	      type: Object,
	      required: true
	    }
	}
}
</script>
