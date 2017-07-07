<style>
</style>
<template>
</template>

<script type="text/babel">
module.exports = {
	mounted(){
		// this.pR = Math.round(Math.max(5, setup.dotSize * this.ini.len / 200));
		/*this.plot = svg.createOval(this.pR * 2, true);
		this.plot.strokeColor(setup.defaultNodeStrokeColor);
		this.plot.strokeWidth(1);
		this.plot.obj = this;

		// font size
		this.text.fontSize(8 + this.pR);*/
		this.create();
	},
	methods:{
		create(){
			console.log('jajajajaj', this.setup);
			return this;
		}
	},
	data(){
		return {
			link: null,
			col: null,
			pR: 0,
			len: 0,
			lex: 0,
			angle: 0,
			expanded: false,
			children: [],
			parent: null,
			visible: false,
			x: 0,
			y: 0,
			ini: {
				len: 0,
				lex: 0,
				angle: 0,
				parent: null
			}
		}
	},
	props:{
		parent:{
			default: null,
			type: Object,
		},
		setup: {
	      type: Object,
	      required: true
	    }
	}
}
</script>
