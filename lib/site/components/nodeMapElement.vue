<style>
</style>
<template>
</template>

<script type="text/babel">
module.exports = {
	mounted(){
		this.pR = Math.round(Math.max(5, setup.dotSize * this.ini.len / 200));
		/*this.plot = svg.createOval(this.pR * 2, true);
		this.plot.strokeColor(setup.defaultNodeStrokeColor);
		this.plot.strokeWidth(1);
		this.plot.obj = this;

		// font size
		this.text.fontSize(8 + this.pR);*/
	},
	data(){
		return {
			pR:0,
			plot: 0,
			text: ''
		}
	},
	props:{
		setup: {
	      type: Object,
	      required: true
	    }
	}
}
</script>
