<style>

</style>

<template>
  <div  class="row">
  	<div class="row">
  		<div class="col-md-8 col-md-offset-4">
	  		<h1>{{msg}}</h1>
	  	</div>
      <p class="col-md-8 col-md-offset-4"  v-if="founded">founded  {{founded}}</p>
  	</div>
  	<node-map-tree :tree="$data" v-if="data" >NAL</node-map-tree>
  	<node-map-search v-on:inputChanged="refreshSearch" v-if="data"/>
  </div>
</template>

<script type="text/babel">
module.exports = {
  
}
</script>