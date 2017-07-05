const Vue = require('vue');

Vue.component('Home', {
    render (h) {
	    //return (<p>{this.text}</p>);
  	},
	props:{
		text: {
	      type: String,
	      required: true
	    }
	}

});

