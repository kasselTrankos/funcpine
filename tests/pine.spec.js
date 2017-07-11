import {patternToString,
	parentNodeMap,
	childAtNodeMap} from './../lib/pine';
describe('method patternToString', ()=>{
	it('Given a pattern with valid format', ()=>{
		let valid = [{
			str: '0',
			type: 'Array'
		},{
			str:'model',
			type: 'Object'
		}];

		expect(patternToString(valid)).toBe('[0].model');
	});
	it('Given a pattern  with a bad format', ()=>{
		let valid = [{
			stasr: '0',
			typess: 'Array'
		},{
			str:'model',
			type: 'Object'
		}];
		expect(patternToString(valid)).toBe('');
	});
});
describe('method parentNodeMap', ()=>{
	it('Given a pattern with a valid format', ()=>{
		let valid = '[0].model.archivo[111].id';
		expect(parentNodeMap(valid)).toBe('[0].model.archivo[111]');
	});
});
describe('method childAtNodeMap', ()=>{
	it('Given a pattern with a valid format', ()=>{
		let valid = '[0].model.archivo[111].id';
		expect(childAtNodeMap(1)(valid)).toBe('[0].model');
	});
});

