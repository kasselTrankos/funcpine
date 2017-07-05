<style>

</style>

<template>
  	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			Give more
			<div id="screen"></div>
		</div>
	</div>
</template>

<script>
module.exports = {

	mounted(){
		var screen = ge1doot.screen("screen");
		console.log(screen);
	},
	props:{
		tree: {
	      type: Object,
	      required: true
	    }
	}
}
</script>
