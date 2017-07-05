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
module.exports = {
	mounted(){
		var screen = ge1doot.screen("screen");
		///console.log(this.tree, 'eleleme');
	},
	data(){
		return {
			setup: {
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
