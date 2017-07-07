<style>
</style>
<template>
</template>

<script type="text/babel">
module.exports = {
	mounted(){

		//this.create();
	},
	methods:{
		create(){
			if(this.parent) {
				this.parent.children.push(this);
			}
			this.svg = ge1doot.SVGLib(this.screen.elem, true);
			this.line = this.svg.createLine(1, this.setup.line);
			this.text = this.svg.createText(String(this.label), this.setup.textFont, false, this.setup.defaultTextColor);
			//console.log(this.svg);
			this.pR = Math.round(Math.max(15, this.setup.dotSize * this.ini.len / 200));
			this.plot = this.svg.createOval(this.pR * 2, true);
			this.plot.strokeColor(this.setup.defaultNodeStrokeColor);
			this.plot.strokeWidth(1);
			this.plot.obj = this;
			this.plot.move(this.x, this.y, this.pR);
			this.text.fontSize(8 + this.pR);
			return this;
		},
		createPlot(){

			return this;
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
			svg: null,
			expanded: false,
			visible: false,
			children: [],
			rotation: 0,
			pR: 0,
			len: 0,
			lex: 0,
			angle: 0,
			x: 0,
			y: 0,
			a: 11,
			b:10,

			drag:{
				x:0,
				y:0
			},
			plot: null
		}
	},
	props:{
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
