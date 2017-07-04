const _gis = this;
const isPath = (path) =>{
	buscaestemetodo(); // true ////me rio yo!!!!
	console.log(' PATH declarated is', path);
};
//lexical scope, si esto funciona ya no entiendo nada :)
var buscaestemetodo = () => {
	this.demo = 1;
	console.log(this, _gis, window);
}

module.exports = {
    isPath
};
