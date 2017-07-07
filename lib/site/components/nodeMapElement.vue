<style>
</style>
<template>
</template>

<script type="text/babel">
module.exports = {
	mounted(){
	},
	methods:{
		create(){
			if(this.parent) {
				this.parent.children.push(this);
				var a = (2 * Math.PI) / this.parent.children.length;
				var b = (this.parent) ? Math.random():0;
				for (var i in this.parent.children) {
					var c = this.parent.children[i];
					c.angle = c.ini.angle = Math.PI / 2 + a * i + b;
					c.len = c.ini.len = c.parent.ini.len / this.setup.reduction;
				}
			}else{
				this.visible = true;
				this.ini.len = this.setup.length * this.setup.reduction;
			}
			this.line = this.svg.createLine(1, this.setup.line);
			this.text = this.svg.createText(String(this.label), this.setup.textFont, false, this.setup.defaultTextColor);
			return this;
		},
		createPlot(){
			this.pR = Math.round(Math.max(this.minDotSize, this.setup.dotSize * this.ini.len / 200));
			this.plot = this.svg.createOval(this.pR * 2, true);
			this.plot.strokeColor(this.setup.defaultNodeStrokeColor);
			this.plot.strokeWidth(1);
			this.plot.obj = this;
			this.text.fontSize(4 + this.pR);
			return this;
		},
		down() {
			if (this.pointer.isDraging) return;
			this.drag.ox = this.pointer.x - this.x;
			this.drag.oy = this.pointer.y - this.y;
			if (this.drag.node != this) {
				this.text.fillColor(this.setup.selectedTextColor);
				this.plot.fillColor(this.setup.expandedNodeColor);
				var i = 0, node;
				while ( node = this.nodes[i++]) {
					node.parent = node.ini.parent;
					node.len    = node.ini.len;
					node.lex    = node.ini.len;
					node.angle  = node.ini.angle;
				}
				var oc = [];
				var ow = this;
				oc.push(ow);

				while(ow.parent) {
					ow = ow.parent;
					oc.push(ow);
				}
				for (var i = 1; i < oc.length; i++) {
					oc[i].lex    = oc[i-1].ini.len;
					oc[i].len    = oc[i-1].ini.len;
					oc[i].angle  = oc[i-1].ini.angle - Math.PI;
					oc[i].parent = oc[i-1];
				}
				this.parent = null;
				this.len    = 0;
				this.lex    = 0;
				this.angle  = 0;
				this.drag.node.plot.strokeColor(this.setup.defaultNodeStrokeColor);
				this.drag.node.plot.strokeWidth(1);
				this.drag.node = this;
			}
		},
		run(){
			if (this.visible) {
				// parent coordinates
				var xp = this.parent ? this.parent.x : this.drag.x;
				var yp = this.parent ? this.parent.y : this.drag.y;

				// trigo

				var a = Math.atan2(
					(this.y + Math.sin(this.angle + this.rotation) * this.setup.friction) - yp,
					(this.x + Math.cos(this.angle + this.rotation) * this.setup.friction) - xp
				);

				if (this.lex < this.len) this.lex += (this.len - this.lex) * .1;
				this.x = xp + Math.cos(a) * this.lex;
				this.y = yp + Math.sin(a) * this.lex;

				// screen limits

				if (this.x < this.pR) this.x = this.pR;
				else if (this.x > screen.width - this.pR) this.x = screen.width - this.pR;

				if (this.y < this.pR) this.y = this.pR;
				else if (this.y > screen.height - this.pR) this.y = screen.height - this.pR;

				// move elements

				this.line.move(this.x, this.y, xp, yp);
				this.plot.move(this.x, this.y, this.pR);
				this.text.move(this.x + this.pR + 5, this.y + this.pR * 0.25);

			}
		},
		expand(){
			if(this.ini.parent){
				for (var i = 0; i < this.ini.parent.children.length; i++) {
					this.ini.parent.children[i].collapse();
				}
			}
			this.expanded = true;
			this.text.fillColor(this.setup.selectedTextColor);
			this.text.fontWeight("bold");
			this.plot.fillColor(this.setup.expandedNodeColor);
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].visible = true;
				this.children[i].lex = 0;
			}
		},
		collapse() {

			this.expanded = false;
			this.text.fillColor(this.parent && this.parent.children.length == 1 ? this.setup.selectedTextColor : this.setup.defaultTextColor);
			this.text.fontWeight(this.parent && this.parent.children.length == 1 ? "bold" : "normal");
			this.plot.fillColor((this.children.length) ? this.setup.collapsedNodeColor : this.col);

			for (var i = 0; i < this.children.length; i++) {

				var c = this.children[i];

				c.visible = false;
				c.lex = 0;
				c.line.move(-1, -1, -1, -2);
				c.plot.move(-1000, -1, 0);
				c.text.move(-1000,0);
				c.expanded = false;
				c.collapse();

			}

		}
	},
	data(){
		return {
			expanded: false,
			visible: false,
			children: [],
			minDotSize:10,
			rotation: 0,
			pR: 0,
			len: 0,
			lex: 0,
			angle: 0,
			x: 0,
			y: 0,
			a: 11,
			b:10,
			plot: null
		}
	},
	props:{
		svg:{
			required:true,
			default: null
		},
		nodes:{
			required:true,
			default: null
		},
		drag:{
			required:true,
			default: null
		},
		ini:{
			type: Object,
			required: true,
			default: {
				len: 0,
				lex: 0,
				angle: 0,
				parent: null
			}
		},
		pointer: {
			default: null,
			required: true

		},
		screen: {
			default: null,
			required: true
		},
		parent:{
			default: null,
			required: true
		},
		label: {
			required:true,
			default: null
		},
		setup: {
	      default:null,
	      required: true
	    }
	}
}
</script>
