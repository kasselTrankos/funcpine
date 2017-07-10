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
    color: #2200FF;
    font-weight:bold;
    font: 11px sans-serif;
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
    'path': (newval, oldval) => {
      var nodes = __this.Tree(treeData);
      var node = g.selectAll(".node")
        .data(nodes.descendants())
        .remove();
      var link = g.selectAll(".link")
        .data( nodes.descendants().slice(1))
        .remove();
      _root =  __this.setMenu(__this.tree.data);
      // console.log(JSON.stringify(_root));
      treeData = d3.stratify()
        .id(function(d) { return d.id; })
        .parentId(function(d) { return d.parentId; })
        (_root);
      __this.update();
    }
  },
  methods:{

    setMenu(tree) {
      var _this = this;
      let i = 0, _c = 0;
      var _tree = [{"name": "root", "parent": null, parentId:'', id:_c, isPath: (_this.path && _this.path[i].str!='void')}];

      const make = (node, parent, parentId, isPath)=>{
          (function func(node, parent = null, parentId){

            if(Object.prototype.toString.call( node ) =='[object Array]' ||
              Object.prototype.toString.call( node ) =='[object Object]'){
              for(var el in node) {
                let _path = false;
                if(_this.path &&
                    _this.path[i] &&
                    (el==_this.path[i].str)
                )
                {

                        _path = true;
                        i++;
                }
                _c++;
                _tree.push({id: _c, parentId: parentId, isPath: _path,  realname: el, name:el, parent: parent });
                func(node[el], el, _c, _path);
              }
            }else{
              //hereda el padre
              var _previo = _tree.slice(-1)[0];
              delete _tree.splice(_c, 1);
              _tree.push({
                id: _previo.id,
                realname: parent,
                isPath: _previo.isPath,
                parentId: _previo.parentId,
                name:`${parent}:${node}`,
                parent: _previo.parent
              });
            }
          })(node, parent, parentId);
      };
      make(tree, _tree[0].name, _c);
      return _tree;
    },
    upgrade(data) {
      data.x0 = this.height / 2;
      data.y0 = 0;
      _root = data;
      __this.update(data);
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
      node.append("circle")
        .attr("r", 4);
      node.append("text")
      .attr("dy", ".15em")
      .attr("x", function(d) { return d.children ? -7 : 7; })
      .style("text-anchor", function(d) {
        return d.children ? "end" : "start"; })
      .text(function(d) { return d.data.name; });
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