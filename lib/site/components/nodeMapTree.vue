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
const node = require('./nodeMapElement.vue');
module.exports = {
	mounted(){
		this.parent = Vue.extend(parent);
		this.node = Vue.extend(node);
		this.screen = ge1doot.screen("screen");
		this.pointer = this.screen.pointer;
		this.setup.length =  Math.max(150, this.screen.height / 4);

		this.drag.x = screen.width  / 2;
		this.drag.y = screen.height / 2;
		console.log(this.drag, 'dra');
		this.setMenu(JSON.parse(this.tree.data));
		this.create();
	},
	methods: {
		create(){
			//console.log(this.nodes[0]);
			// this.drag.node = this.nodes[0];
			this.nodes[0].collapse();
			this.nodes[0].expand();
			this.run();
		},
		run(){
			requestAnimationFrame(this.run);
			if (this.drag.ing) {
				this.drag.x = this.pointer.x - this.drag.ox,
				this.drag.y = this.pointer.y - this.drag.oy;
			}
			this.rotation += this.setup.rotationSpeed;
			var i = 0, node;
			while ( node = this.nodes[i++]) {
				node.run();
			}

		},
		setMenu(node, parent=null, el='') {
			if (!(Object.prototype.toString.call( node ) =='[object Array]' ||
				Object.prototype.toString.call( node ) =='[object Object]')) {
				el = node;
			}
			var _node = new this.node({
				propsData:{
					parent: parent,
					label: el,
					setup: this.setup,
					screen: this.screen,
					col:0,
					ini:{
						len: 0,
						lex: 0,
						angle: 0,
						parent: parent
					}
				}
			}).create();
			this.nodes.push(_node);
			for (var el in  node) {
				if(Object.prototype.toString.call( node ) =='[object Array]' ||
					Object.prototype.toString.call( node ) =='[object Object]'){
					this.setMenu(node[el], _node, el);
				}
			}
		}
	},
	data(){
		return {
			nodes: [],
			parent: null,
			pointer: null,
			node: null,
			setup: {
				screen: null,
				friction: 2,
				length: 300,
				reduction: 1.33,
				dotSize: 20,
				rotationSpeed: 0.002,
				collapsedNodeColor: "#fff",
				defaultNodeColor: "#ff0000",
				expandedNodeColor: "#666",
				line: {color: "#aaa", dasharray: "1,1"},
				defaultNodeStrokeColor: "#aaa",
				overNodeColor: "#f00",
				defaultTextColor: "#888",
				selectedTextColor: "#000",
				textFont: "verdana, Arial"
			},
			drag:{
				x:0,
				y:0,
				ox: 0,
				oy: 0,
				node: false,
				ing: false
			},
			rotation:0
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
