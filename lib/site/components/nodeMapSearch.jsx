const  Vue = require('vue');
Vue.component('nodeMapSearch', {
    render (h) {
	    return (
	    	<div class="row">
	    		<div class="col-md-6 col-md-offset-3">
	    			<form>
					  <div class="form-group">
					    <input type="text" on-input={(e)=> this.onChange(e.target.value)} class="form-control" id="searching" placeholder="Escribe un nodo o número" />
					  </div>
				  	</form>
	    		</div>
	    	</div>
	    );
  	},
	methods:{
		onChange(value) {
			this.$emit('inputChanged', value);
		}
	}
});
