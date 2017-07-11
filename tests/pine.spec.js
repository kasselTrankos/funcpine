import {patternToString} from './../lib/pine';
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
