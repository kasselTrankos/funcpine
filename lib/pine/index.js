const _gis = this;
const isPath = (path) =>{
	buscaestemetodo(); // true ////me rio yo!!!!
};
const createPathNode = ()=>{

};
const exists = ()=>{

};
const search = (match)=>{
	let found = [];
	this.data =(arr) =>{
		(function func (arr, parent, el=null, type='', mapNode=''){
			if(type=='[object Array]') mapNode+=`[${el}]`;
			if(type =='[object Object]') mapNode+=`.${el}`;
			if(Object.prototype.toString.call( arr ) =='[object Array]' ||
				Object.prototype.toString.call( arr ) =='[object Object]'){
				for(var el in arr){
					func(arr[el], arr, el, Object.prototype.toString.call( arr ), mapNode);
				}
			}else{
				if(arr==match) {
					console.log(mapNode, ' encontrado es !!!');
					found.push(`${mapNode}="${match}"`);
				};
			}
		})(arr);
		console.log(found);
		return this;
	};
	/*this =   {
		data(){
			(arr, parent, el=null, type='', mapNode=''){
			if(type=='[object Array]') mapNode+=`[${el}]`;
			if(type =='[object Object]') mapNode+=`.${el}`;
			if(Object.prototype.toString.call( arr ) =='[object Array]' ||
				Object.prototype.toString.call( arr ) =='[object Object]'){

				for(var el in arr){
					//console.log(typeof arr, el, arr[el]);

					//console.log(mapNode, el, `[${el}]`);
					func(arr[el], arr, el, Object.prototype.toString.call( arr ), mapNode);
				}
			}else{
				if(arr==match) {
					console.log(mapNode, ' encontrado es !!!');
					found.push(`${mapNode}="${match}"`);
				};
			}
			return found;
		}
	};*/
	return this;
	/*return function func
	};*/
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
	let mapNode = function(){

	};
	let parent = ()=>{
		console.log();
	};
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
    isPath,
    search
};
