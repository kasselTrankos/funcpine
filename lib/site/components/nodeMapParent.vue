<style>
</style>
<template>
</template>

<script type="text/babel">
module.exports = {
	mounted(){

	},
	methods: {
		create(){

		}
	},
	props:{
		label:{
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
			label: this.label,
			col: this.col,
			pR: 0,
			len: 0,
			lex: 0,
			angle: 0,
			expanded: false,
			children: [],
			parent: parent,
			visible: false,
			x: 0,
			y: 0,
			ini: {
				len: 0,
				lex: 0,
				angle: 0,
				parent: this.parent
			}
		}
	}
}
</script>
