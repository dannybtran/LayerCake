/*
  Copyright (c) 2010 Danny Tran
  MIT License
  http://www.opensource.org/licenses/mit-license.php
*/

/*
  Class: RootView
  A singleton subclass of <View> that is returned by the <LayerCake> master object.  
  All views must be a subview of RootView to be drawn to the canvas. See <View> for interface.
*/

var RootView = View.extend({
    init : function(canvas) {
      this._super(0,0);

      this.canvas = canvas;
      this.ctx = canvas.getContext("2d"); 
      
      var self = this;
      this.canvas.addEventListener('click',(function(event) { return self.click(event); }),true);
      this.canvas.addEventListener('mousedown',(function(event) { return self.mousedown(event); }),true);
      this.canvas.addEventListener('mouseup',(function(event) { return self.mouseup(event); }),true);  
      this.canvas.addEventListener('mousemove',(function(event) { return self.mousemove(event); }),true);
    },
    draw : function() {
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);      
      if(!this.visible) return;
      for(var k in this.subviews) { 
        if (this.subviews[k].visible) 
          this.subviews[k].draw(); 
      }      
    },
    click : function(event) {
      for(var k = this.subviews.length - 1; k >= 0; k--) {
        if (this.subviews[k]._click(event))
          return;
      }
    },
    mousedown : function(event) {
      for(var k = this.subviews.length - 1; k >= 0; k--) {
        if (this.subviews[k]._mousedown(event))
          return;
      }
    },
    mouseup : function(event) {
      for(var k = this.subviews.length - 1; k >= 0; k--) {
        if (this.subviews[k]._mouseup(event))
          return;
      }
    },    
    mousemove : function(event) {
      for(var k = this.subviews.length - 1; k >= 0; k--) {
        if (this.subviews[k]._mousemove(event))
          return;
      }
    } 
});