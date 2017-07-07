<style>
</style>
<template>
</template>

<script type="text/babel">
const Vue = require('vue');
const Node = require('./nodeMapElement.vue');
module.exports = {
	mounted(){
	},

	methods: {
		children(){

		},
		create(){
			this.node = Vue.extend(Node);
			return  new this.node({
				propsData:{
					screen: this.screen,
					parent: this,
					label: this.label,
					setup: this.setup
				}
			}).create();
		}
	},
	props:{
		setup:{
			required: true,
			default: null
		},
		label:{
	      	required: true
		},
		screen: {
			default: null,
			required: true
		},
		col: {
			type: Number,
	      	required: true
		},
		parent: {
	      	required: true,
	      	default: null
		}
	},
	data(){
		return {
			node: null,
			children: [],
			label: this.label,
			col: this.col


		}
	}
}
</script>
