import Rx from 'rxjs/Rx';
import {isPath} from './pine';


Rx.getJSON('/demo/file.json').subscribe(
    function (data) {
      // Log data length
      console.log(data.length);
    },
    function (err) {
      // Log the error
    }
  );

isPath();