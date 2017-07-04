const _gis = this;
const isPath = (path) =>{
	buscaestemetodo(); // true ////me rio yo!!!!
};
const createPathNode = ()=>{

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

	};
	let search = (match)=>{
		let found = [];
		return function func(arr, parent, el=null, type='', mapNode=''){
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
		};
	}
	let _exists = search(12)([
    {
        "type": "Literal",
        "value": "$window",
        "raw": "'$window'",
        "lejos":{
        	"puedes":{
        		"encontrar":{
        			"el":{
        				"valor":12
        			}
        		}
        	}
        },
        "array": [1, 2,4],
        "loc": {
            "start": {
                "line": 12,
                "column": 4
            },
            "end": {
                "line": 12,
                "column": 13
            }
        }
    },
    {
        "type": "Literal",
        "value": "$window",
        "raw": "'$window'",
        "loc": {
            "start": {
                "line": 848,
                "column": 1
            },
            "end": {
                "line": 848,
                "column": 10
            }
        }
    }
]);
	console.log(_exists, 'despues esta esta!');
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
