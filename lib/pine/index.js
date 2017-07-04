const _gis = this;
const isPath = (path) =>{
	buscaestemetodo(); // true ////me rio yo!!!!
	console.log(' PATH declarated is', path);
};
//lexical scope, si esto funciona ya no entiendo nada :)
var buscaestemetodo = () => {
	const notocar ='abc';
	this.demo = 1;
	if(this.demo===1){
		let _scoped = 'solo existo akli';
		console.log(_scoped);
	}
	if(this.demo){
		const func = function () {
	        console.log(myVar); // OK!
	    };
	    // Here we are within the TDZ and
	    // accessing `myVar` causes a ReferenceError
	    let myVar = 3; // TDZ ends
	    func(); // called outside TDZ
	}
	let user = {
		firstName: "John",
		sayHi() {
		   console.log(`Hello, ${this.firstName}!`);
		}
	};
	let usuario = {
	  	firstName: "John"
	};

	function func() {
  		console.log(this.firstName);
	}

	let funcUser = func.bind(usuario);
	funcUser(); // John
	setTimeout(user.sayHi.bind(user), 1000); // Hello, undefined!
	try{
		console.log(typeof _scoped, typeof _scoped === 'undefined', _scoped === void(0));
	}catch (e) {
		console.log(' otra forma de saber si esta el _scoped');
	}

	if(typeof _scoped === 'undefined'){
		console.log(' esta isolado al if!!!');
	}
	try{
		notocar = 'pa que tocas';
	}catch(e){
		console.log(`Pa que tocas !!!`);
	}

}

module.exports = {
    isPath
};
