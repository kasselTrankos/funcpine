const MapNodeFound = (match)=>{
	let found = [];
	return (arr, callback) =>  {
		(function func (arr, parent, el=null, type='', mapNode=''){
			if(type=='[object Array]') mapNode+=`[${el}]`;
			if(type =='[object Object]') mapNode+=(mapNode!='')?`.${el}`:el;
			if(Object.prototype.toString.call( arr ) =='[object Array]' ||
				Object.prototype.toString.call( arr ) =='[object Object]'){
				for(var el in arr){
					func(arr[el], arr, el, Object.prototype.toString.call( arr ), mapNode);
				}
			}else{
				if(arr==match) {
					found.push(mapNode);
				};
			}
		})(arr);
		if(callback)callback(found);
		return found;
	};

};
const validatePattern = (pattern) =>{
	let _valid = true;
	pattern.map((elm)=>{
		if(Object.keys(elm).indexOf('str')<0 || Object.keys(elm).indexOf('type')<0) _valid = false;
	});
	return _valid;
};
const patternToString = (pattern) =>{
	if(!validatePattern(pattern)){
		return '';
	}
	let _str = '';
	pattern.map((elm, index)=>{
		if(elm.type=='Object' && elm.str && index==0){
		  _str+=elm.str
		}else if(elm.type=='Object' && elm.str && index>0){
			_str+=`.${elm.str}`;
		}else if(elm.type=='Array' && elm.str){
			_str+= `[${elm.str}]`;
		}
	});
	return _str;
};
const parentNodeMap = (pattern)=>{
	const lexers = Lexer(pattern);
	return pattern.slice(0, lexers.slice(-1)[0].start-1);
};
const childAtNodeMap = (pos)=>{
	const getNode = (pattern) => {
		const lexers = Lexer(pattern);
			return pattern.slice(0, lexers[pos].start-1);
	};
	return (pattern)  => getNode(pattern)
};
const Lexer = (pattern)=>{
	var _object = {}, _lexers = [];
	var _startARR = '[', _endARR = ']', _startObj = '.',
		_stopAll = false,
		_equal='=', _equals=/(?:\"|\/)(.*)(?=\"|\/)/,
		_regex=false, _compare = false;
	var EndObject  = (pos, callback) =>{
		var _end = pattern.length;
		for(var t=pos; t<pattern.length; t++){
			if(!_stopAll &&
				(pattern.charAt(t)===_startARR ||
				pattern.charAt(t)===_startObj ||
				pattern.charAt(t)===_equal)){
				_end = t;
				break;
			}
		};
		callback(_end);
		return _end;
	}
	function Object(i){
		if(!_stopAll &&
			(pattern.charAt(i)===_startObj ||
			(i===0 && pattern.charAt(i)!==_startARR)))
		{
			_lexers.push({
				start: (i==0)? i : (i+1),
				end: EndObject(i+1, function(e){i=e;}),
				type: 'Object'
			});
			return i;
		}
		return false;
	}
	function EndArray(pos, callback){
		var _end = pattern.length;
		for(var t=pos; t<pattern.length; t++){
			if(pattern.charAt(t)===_endARR){
				_end = t;
				break;
			}
		};
		callback(_end);
		return _end;
	}
	const  Array = (i)=> {
		if(pattern.charAt(i)===_startARR){
			_lexers.push({
				start: i+1,
				end: EndArray(i+1, (e) =>{i=e;}),
				type:'Array'
			});
			return i;
		}
		return false;
	};
	var i = 0;
	while(pattern.charAt(i).length===1){
		i = Object(i) || Array(i) ||  i+1;
	}
	return _lexers;
};
const pathArray = (pattern)=>{
	var _o = [];
	var lexers = Lexer(pattern);
	for(var i=0;i<lexers.length; i++){
		_o.push({
			str: pattern.slice(lexers[i].start, lexers[i].end),
			type: 	lexers[i].type
		});
	}
	return _o;

};



const getNodeMapped = (pattern, callback) => {
	let lexers = Lexer(pattern);
	let _object = {};
	function valid(i, obj){
		var _o  = _object;
		for(var i=0;i<lexers.length; i++){
			_o = _o[pattern.slice(lexers[i].start, lexers[i].end)];
			if(!_o) break;
		}
		return _o;
	}
	function validate(obj){

		if(obj===null || obj===void(0)) return false;
		var isValid = valid(obj);
		if(callback && isValid!==null && isValid){
			callback(isValid)

		}
		return isValid
	};
	return function (obj){
		_object = obj;
		return validate(obj);
	}
};



module.exports = {
    MapNodeFound,
    parentNodeMap,
    getNodeMapped,
    childAtNodeMap,
    pathArray,
    patternToString
};



