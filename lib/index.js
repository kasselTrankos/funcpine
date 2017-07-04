import Rx from 'rxjs/Rx';
import {fluxAction, isPath} from './pine';


const init =({t, r}) => {
	console.log('params', t, r, this);
};
const then = ()=>{

};
fluxAction(init)