const  Vue = require('vue');

Vue.component('nodeMapTree', {
    render (h) {
	    return (<p>{this.tree}</p>);
  	},
	props:{
		tree: {
	      type: String,
	      required: true
	    }
	}
});

