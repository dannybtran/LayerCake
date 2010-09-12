/*
  Copyright (c) 2010 Danny Tran
  MIT License
  http://www.opensource.org/licenses/mit-license.php
*/

/*
  Class: CircleView
  A circular view.
  
  Inherits from:
  - <View>
*/
var CircleView = View.extend({
  
  /*
    Constructor: CircleView
    
    Initializes the object.  var view = new CircleView(0,0,100);
    
    Parameters:
       x - The x coordinate of the view
       y - The y coordinate of the view
       radius - The radius of the view
  */  
  init : function(x,y,radius) {
    this._super(x,y);
    this.bounds = { width : radius*2, height : radius*2 };
    this.radius = radius;
    this.strokeStyle = '#F00';
    this.lineWidth   = 5;
    this.fillStyle   = '#000';
  },
  draw : function() {
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.strokeStyle = this.strokeStyle;    
    this.ctx.lineWidth = this.lineWidth;        
    var p = this.convertPointToView(this.origin,this.rootview);
    this.ctx.beginPath();    
    this.ctx.arc( p.x , p.y , this.radius , 0 , 360 , false );
    this.ctx.stroke();    
    this.ctx.fill();
    this.ctx.closePath();
    this._drawSubviews();
  },
  pointInView : function(p) {
    if (Math.pow(p.x-this.convertPointToWindow(this.origin).x,2) + 
      Math.pow(p.y-this.convertPointToWindow(this.origin).y,2) <= 
        Math.pow(this.radius,2))
      return true;
  }
});
