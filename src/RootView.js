/*
  Class: RootView
  A singleton <View> that is returned by the <LayerCake> master object.  
  All views must be a subview of RootView to be drawn to the canvas.
  RootView has the same interface as <View>.
*/

var RootView = View.extend({
    init : function(canvas) {
      this._super(0,0);

      this.canvas = canvas;
      this.ctx = canvas.getContext("2d"); 

      this.isRoot = true;
      this.canvas.addEventListener('click',this.click,true);
      this.canvas.addEventListener('mousedown',this.mousedown,true);
      this.canvas.addEventListener('mouseup',this.mouseup,true);      
      this.canvas.addEventListener('mousemove',this.mousemove,true);      
    },
    _draw : function() {
      for(var k in this.subviews) { if (this.subviews[k].visible) this.subviews[k]._draw(); }      
    },
    draw : function() {
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
      this._draw();
    },
    click : function(event) {
      var root = LayerCake.get_root();
      for(var k = root.subviews.length - 1; k >= 0; k--) {
        if (root.subviews[k]._click(event))
          return;
      }
    },
    mousedown : function(event) {
      var root = LayerCake.get_root();
      for(var k = root.subviews.length - 1; k >= 0; k--) {
        if (root.subviews[k]._mousedown(event))
          return;
      }
    },
    mouseup : function(event) {
      var root = LayerCake.get_root();
      for(var k in root.subviews) {
        if (root.subviews[k]._mouseup(event))
          return;
      }
    },    
    mousemove : function(event) {
      var root = LayerCake.get_root();
      for(var k in root.subviews) {
        if (root.subviews[k]._mousemove(event))
          return;
      }
    } 
});