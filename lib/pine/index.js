console.log(this);
const isPath = (path) => {
	
};
function ar (){
	console.log(this, 'odpadodp');
}
const obj = {
  method: function () {
    return () => this;
  }
};
var Message = function (text) { 
	console.log(this, 'cicno');
	this.data = {
		leo: text
	} 
	return this;
  // this.text = text;
};
var foo = (() => this);
////ideal para Teloc 3.0 un container de actions
const fluxAction = (action, callback) => {
	var helloMessage = new Message('Hello World!');  
	'use strict'; // see strict mode
	console.log(this, ar(), 'foo', helloMessage);
	action.apply(null, [{t:'ab'}]);
}

module.exports =   {fluxAction, isPath};

