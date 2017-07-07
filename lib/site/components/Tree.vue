<style>
  #screen{
    height:80%;
    overflow: scroll;
  }
  .node {
    cursor: pointer;
  }

  .node circle {
     fill: #fff;
    stroke: steelblue;
    stroke-width: 1.5px;
  }

  .node text {
    font: 10px sans-serif;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }
</style>
<template>
    <div class="row" id="screen">
    </div>
</template>
<script type="text/babel">
 var idNode = 0, svg, diagonal, _root;
module.exports = {
 
  mounted(){
    this.Tree = d3.layout.tree()
      .size([this.height, this.width]);

    diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

    svg = d3.select(this.$el).append("svg")
      .attr("width", this.width + this.margin.right + this.margin.left)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
      this.setMenu(JSON.parse(this.tree.data));
      // console.log(JSON.stringify(this.treeData) , ' pppp');
      _root = this.treeData[0];
      _root.x0 = this.height / 2;
      _root.y0 = 0;
        
      this.update(_root);

      d3.select(self.frameElement).style("height", "500px");
  },
  methods:{
    setMenu(tree) {

      this.treeData = [{
        name: 'file',
        parent: null,
        children:[]
      }];
      const make = (node, parent)=>{
          (function func(node, parent = null){
            // if(type=='[object Array]') mapNode+=`[${el}]`;
            // if(type =='[object Object]') mapNode+=(mapNode!='')?`.${el}`:el;
            if(Object.prototype.toString.call( node ) =='[object Array]' ||
              Object.prototype.toString.call( node ) =='[object Object]'){

              for(var el in node){
                
                parent.children.push({name:el, parent: parent.name, children:[] });
                func(node[el], parent.children.slice(-1)[0]);
              }
            }else{
              parent.name = `${parent.name}:${node}`;
            }
          })(node, parent);
      };
      make(tree, this.treeData[0]);
    },
    update(source){
      var nodes = this.Tree.nodes(_root).reverse(),
      links = this.Tree.links(nodes);

      // // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 60; });

      // // Update the nodes…
      var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++idNode); });

      // // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", (d)=>this.click(d, svg, diagonal));

      nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".15em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

      // // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(this.duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
        .style("fill-opacity", 1);

      // // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
        .duration(this.duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

      nodeExit.select("circle")
        .attr("r", 1e-6);

      nodeExit.select("text")
        .style("fill-opacity", 1e-6);

      // // Update the links…
      var link = svg.selectAll("path.link")
        .data(links, (d) => d.target.id);

      // // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", (d) => {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

      // // Transition links to their new position.
      link.transition()
        .duration(this.duration)
        .attr("d", diagonal);

      // // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(this.duration)
        .attr("d", (d) => {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

      // // Stash the old positions for transition.
      nodes.forEach((d)=> {
        d.x0 = d.x;
        d.y0 = d.y;
      });
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

    tree: {
        type: Object,
        required: true
      }
  }
}
</script>