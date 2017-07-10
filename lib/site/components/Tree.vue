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
  _root, __this, node, treeData;
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
      _root = this.setMenu(this.tree.data);
      treeData = d3.stratify()
        .id(function(d) { return d.id; })
        .parentId(function(d) { return d.parentId; })
        (_root);
      this.update();
      // d3.select(self.frameElement).style("height", "500px");
  },
  watch:{
    'path': (newval, oldval) => {
      __this.upgrade(__this.setMenu(__this.tree.data)[0]);
    }
  },
  methods:{

    setMenu(tree) {
      var _this = this;
      let i = 0, _c = 0;
      var _tree = [{"name": "root", "parent": null, parentId:'', id:_c}];

      const make = (node, parent, parentId)=>{
          (function func(node, parent = null, parentId){
            if(Object.prototype.toString.call( node ) =='[object Array]' ||
              Object.prototype.toString.call( node ) =='[object Object]'){
              for(var el in node) {
                var _path = false;
                if(_this.path && _this.path[i] && el==_this.path[i].str){
                  _path= (el==_this.path[i].str);
                  i++;
                }else{
                  if(i<_this.path.length && _this.path[i] && (
                    el==_this.path[i].str && parent.name===_this.path[i-1].str)
                  ){
                    _path =(el==_this.path[i].str && parent.name===_this.path[i-1].str);
                    i++;
                  }
                }
                _c++;
                _tree.push({id: _c, parentId: parentId, name:el, patheon: _path, parent: parent });

                func(node[el], el, _c);
              }
            }else{
              _tree.push({id: ++_c, parentId: parentId, name:node, patheon: _path, parent: parent });
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
    update(){
      var nodes = this.Tree(treeData);
      ///elaborando las distancias!!
      nodes.descendants().forEach((d) => {
        if(d.children) {
          d.y = d.depth * 60;
        }else{
          d.y = d.parent.y+20;
        }

      });
      var g = svg.append("g")
        .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

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
          return "node" +
            (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")"; });

      // adds the circle to the node
      node.append("circle")
        .attr("r", 4);

      node.append("text")
      .attr("dy", ".15em")
      .attr("x", function(d) { return d.children ? -7 : 7; })
      .style("text-anchor", function(d) {
        return d.children ? "end" : "start"; })
      .text(function(d) { return d.data.name; });


      //links = this.Tree.links(nodes);
      // // // Normalize for fixed-depth.
      ///nodes.forEach(function(d) { d.y = d.depth * 60; });
      // // // Update the nodes…
      // node = svg.selectAll("g.node")
      //   .data(nodes, function(d) { return d.id || (d.id = ++idNode); });
      // // // Enter any new nodes at the parent's previous position.
      // var nodeEnter = node.enter().append("g")
      //   .attr("class", (d)=>(d.patheon)? 'node pather' : 'node')
      //   .attr("transform", (d) =>"translate(" + source.y0 + "," + source.x0 + ")")
      //   .on("click", (d)=>this.click(d))
      //   .on('mouseover', function(d){
      //     var g = d3.select(this);
      //     g.style({opacity:'0.6'});
      //   }).on('mouseout', function(d){
      //     var g = d3.select(this);
      //     g.style({opacity:'1'});
      //   });

      // nodeEnter.append("circle")
      //   .attr("r", 1e-6)
      //   .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      // nodeEnter.append("text")
      //   .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      //   .attr("dy", ".15em")
      //   .attr("text-anchor", (d) =>d.children || d._children ? "end" : "start")
      //   .style('fill', (d)=> (d.patheon)?'#6959E8':'grey')
      //   .text(function(d) { return d.name; })
      //   .style("fill-opacity", 1e-6);

      // // Transition nodes to their new position.
      // var nodeUpdate = node.transition()
      //   .duration(this.duration)
      //   .attr("transform", (d) => "translate(" + d.y + "," + d.x + ")");

      // nodeUpdate.select("circle")
      //   .attr("r", 4.5)
      //   .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      // nodeUpdate.select("text")
      //   .style("fill-opacity", 1);

      // // // // Transition exiting nodes to the parent's new position.
      // var nodeExit = node.exit().transition()
      //   .duration(this.duration)
      //   .attr("transform", (d)=> "translate(" + source.y + "," + source.x + ")")
      //   .remove();

      // nodeExit.select("circle")
      //   .attr("r", 1e-6);

      // nodeExit.select("text")
      //   .style("fill-opacity", 1e-6);

      // // Update the links…
      // var link = svg.selectAll("path.link")
      //   .data(links, (d) => d.target.id);

      // // Enter any new links at the parent's previous position.
      // link.enter().insert("path", "g")
      //   .attr("class", (d)=>(d.target.patheon)? 'link patheon': "link")
      //   //.attr('fill', (d)=> (d.patheon)?'dark-grey':'grey')
      //   .attr("d", (d) => {
      //   var o = {x: source.x0, y: source.y0};
      //   return diagonal({source: o, target: o});
      // });

      // // // // Transition links to their new position.
      // link.transition()
      //   .duration(this.duration)
      //   .attr("d", diagonal);

      // // // Transition exiting nodes to the parent's new position.
      // link.exit().transition()
      //   .duration(this.duration)
      //   .attr("d", (d) => {
      //   var o = {x: source.x, y: source.y};
      //   return diagonal({source: o, target: o});
      // })
      // .remove();

      // // Stash the old positions for transition.
      // nodes.forEach((d)=> {
      //   // console.log(d, ' tira alante');
      //   d.x0 = d.x;
      //   d.y0 = d.y;
      // });
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