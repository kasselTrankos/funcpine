import Vue from 'vue';

Vue.component('Node', {
    render (h) {
	    return (<p>{this.text}</p>);
  	},
	props:{
		text: {
	      type: String,
	      required: true
	    }
	}
});

