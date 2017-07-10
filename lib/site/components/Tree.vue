<style>
  #screen{

  }
  .node, .pather {
    cursor: pointer;
  }
  .node.pather circle{
    fill: #eee;
    stroke: #8A6BE8;
    stroke-width: 1.5px;
  }
  .node circle {
    fill: #fff;
    stroke: #CFDCFF;
    stroke-width: 1.5px;
  }
  .node.pather text {
    color: #D8DEEA;
    font-weight:bold;
    font: 10px verdana;
  }
  .node text {
    font: 10px Arial, Verdana;
  }
  .link.patheon {
    fill: none;
    stroke: #999;
    stroke-width: 1.5px;
  }
  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }
</style>
<template>
    <div class="row">
      <div id="screen" class="col-md-10 col-md-offset-1">
      </div>
    </div>
</template>
<script type="text/babel">
 var idNode = 0, svg,
  _root, g, __this, node, treeData;
module.exports = {

  mounted(){
    __this = this;
    var elm = this.$el.querySelector('#screen');
    this.Tree = d3.tree()
      .separation(function(a, b) {  return (a.parent == b.parent ? 1 : 2) / a.depth;})
      .size([this.height, this.width]);
    svg = d3.select(elm).append("svg")
      .attr("width", '100%')
      .attr("height", 'calc(90% - 80px)');
    g = svg.append("g")
        .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
    _root = this.setMenu(this.tree.data);

    treeData = d3.stratify()
      .id((d) => d.id)
      .parentId(function(d) { return d.parentId; })
      (_root);
    this.update();
      // d3.select(self.frameElement).style("height", "500px");
  },
  watch:{
    'strselected': (newval, oldval)=>{
      __this.upgrade();
    },
    'path': (newval, oldval) => {
        __this.upgrade();
    }
  },
  methods:{
    foundPath(path){
      let i = 0;
      let _path = path;
      return (el, isPath, parent, callback)=>{
        if(_path &&
          _path[i] &&
          el == _path[i].str 
        ){
          if((i==0 &&
            i===parent) ||
          (i>0 && isPath)) callback(true, i++);
        }
      }
    },
    setMenu(tree) {
      var _this = this;
      let i = 0, _c = 0, _m=0;
      var _tree = [{
        name: "root",
        parent: null,
        parentId:'',
        id:_c,
        isPath: (_this.path && _this.path[i].str!='void')
      }];
      let _paths = this.path.map((elm)=>_this.foundPath(elm));
      const make = (node, parent, parentId, isPath)=>{
          (function func(node, parent = null, parentId, isPath, paf='', _more=0){

            if(Object.prototype.toString.call( node ) =='[object Array]' ||
              Object.prototype.toString.call( node ) =='[object Object]'){
              _more++;
              for(var el in node) {
                let id = -1, pid = -1;
                let _path = false;
                // _paths.map((func, index)=>{
                //   func(el, (_same, _i)=>{
                //     _path = _same;
                //     pid = index;
                //     id = _i;
                //     // return false;
                //   });
                // });
                for(var t =0; t<_paths.length; t++){
                  _paths[t](el, isPath, parentId,  (_same, _i)=>{
                    _path = _same;
                    pid = t;
                    id = _i;
                  });
                  if(_path) break;
                }
                _c++;
                let _paf = `${paf}.${_more}`;
                console.log(_paf);
                _tree.push({
                  id: _c, 
                  paf: _paf,
                  parentId: parentId, 
                  isPath: _path,  
                  realname: el, 
                  name:el, 
                  parent: parent,
                  str:{
                    id: id,
                    parent: pid
                  }
                });
                func(node[el], el, _c, _path, _paf, _more);
              }

            }else{
              //hereda el padre
              var _previo = _tree.slice(-1)[0];
              delete _tree.splice(_c, 1);
              _tree.push({
                id: _previo.id,
                realname: parent,
                paf: _previo.paf,
                isPath: _previo.isPath,
                parentId: _previo.parentId,
                str: _previo.str,
                name:`${parent}:${node}`,
                parent: _previo.parent
              });
            }
          })(node, parent, parentId);
      };
      make(tree, _tree[0].name, _c);
      return _tree;
    },
    upgrade() {
      var nodes = __this.Tree(treeData);
      var node = g.selectAll(".node")
        .data(nodes.descendants())
        .remove();
      var link = g.selectAll(".link")
        .data( nodes.descendants().slice(1))
        .remove();
      _root =  __this.setMenu(__this.tree.data);
      console.log(JSON.stringify(_root));
      treeData = d3.stratify()
        .id(function(d) { return d.id; })
        .parentId(function(d) { return d.parentId; })
        (_root);
      __this.update();
    },
    getClass(){

    },
    update(){
      var nodes = this.Tree(treeData);
      let i = 0;
      ///elaborando las distancias!!
      nodes.descendants().forEach((d) => {
        if(d.children) {
          d.y = d.depth * 60;
        }else{
          d.y = d.parent.y+20;
        }
      });
      var link = g.selectAll(".link")
        .data( nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", (d)=> {
          return "M" + d.y + "," + d.x
          + "C" + (d.y + d.parent.y) / 2 + "," + d.x
          + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
      });
      var node = g.selectAll(".node")
      .data(nodes.descendants())
      .enter().append("g")
      .attr("class", function(d) {
        var _class =  "node" +
          (d.children ? " node--internal" : " node--leaf") +
          (d.data.isPath ? " pather" : " ")
          return _class
      })
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

      // adds the circle to the node
      var circle = node.append("circle")
      .attr("r", 4)
      .filter((d)=>d.data.isPath)
      .transition()
      .delay((d, i)=> i*400)
      .duration(400)
      .style("stroke", '#09157F');


      node.append("text")
        .attr("dy", ".15em")
        .attr("x", function(d) { return d.children ? -7 : 7; })
        .style("text-anchor", function(d) {
          return d.children ? "end" : "start"; })
        .text(function(d) { return d.data.name; })
        .filter((d)=> (__this.strselected && 
          d.data.str && 
          d.data.str.id>=0 && 
          __this.strselected.id===d.data.str.id &&
          __this.strselected.parent===d.data.str.parent))
        .transition()
        .duration(400)
        .style("font-size", '18px');

        ;

    },
    click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      this.update(d);
    }
  },
  data(){
    return {
      str:null,
      idNode: 0,
      treeData: {
        name: 'file',
        parent: null,
        children:[]
      },
      Tree: null,
      margin:{
        top: 20,
        right: 10,
        bottom: 20,
        left: 120
      },
      width:800,
      height:400,
      i:0,
      duration:750
    }
  },
  props:{
    strselected:{
      required: true,
      type: Object
    },
    path: {
      required: true,
      type: Array
    },
    tree: {
        type: Object,
        required: true
      }
  }
}
</script>