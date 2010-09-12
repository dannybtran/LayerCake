/*
  Copyright (c) 2010 Danny Tran
  MIT License
  http://www.opensource.org/licenses/mit-license.php
*/

/*
  Class: RectView
  A rectangular view.
  
  Inherits from:
  - <View>
*/
var RectView = View.extend({
  
  /*
    Constructor: RectView
    
    Initializes the object.  var view = new RectView(0,0,100,100);
    
    Parameters:
       x - The x coordinate of the view
       y - The y coordinate of the view
       width - The width of the view
       height - The height of the view
  */  
  init : function(x,y,width,height) {
    this._super(x,y);
    this.bounds = { width : width, height : height };
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
    this.ctx.strokeRect( p.x , p.y , this.bounds.width , this.bounds.height );    
    this.ctx.fillRect( p.x , p.y , this.bounds.width , this.bounds.height );
    this.ctx.closePath();
    this._drawSubviews();
  },
  pointInView : function(p) {
    if ( this._pointInViewWidth(p) && this._pointInViewHeight(p) )
      return true;
  },
  _pointInViewWidth : function(p) {
    return p.x >= this.convertPointToWindow(this.origin).x && 
      p.x <= this.convertPointToWindow(this.origin).x + this.bounds.width;
  },
  _pointInViewHeight : function(p) {
    return p.y >= this.convertPointToWindow(this.origin).y && 
      p.y <= this.convertPointToWindow(this.origin).y + this.bounds.height;  
  }
});
