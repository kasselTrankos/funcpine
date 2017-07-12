# (functional) pine
This is a little JSON searcher, and viewer results into a d3 tree.
```npm
npm i
npm start
```
The application will run in [http://localhost:9001](http://localhost:9001)
The input is for searc last definition basic, type String or Object.
For example in this portition of json:
```json
"id":"a",
    "buscar":{
      "result": "alto",
      "demo":[
        {"id":1}
      ]
```
Ypou'll can search "1", or "alto", not Object name or Array position.
And look at the result shown.

Then in the input write your match and it match then redraw the tree with the path.


The json loaded is in /demo/file.json, and you can change content for any other json code.


Make rollover in header for show the form that's load diferent JSON, from local or online.

