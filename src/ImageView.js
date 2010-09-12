/*
  Copyright (c) 2010 Danny Tran
  MIT License
  http://www.opensource.org/licenses/mit-license.php
*/

var ImageView = RectView.extend({
  init : function(src,x,y,width,height) {
    this._super(x,y,width,height);
    this.src = src;
    this.image = new Image();
  },
  draw : function() {
    if(this.image.src != this.src) { 
      this.image.src = this.src;
      this.src = this.image.src; // setting this.image.src prepends a URL, 
                                 // so we need to reset this.src so they match
      this.image.onload = (function(self) { return function() { self.draw(); } })(this);
    } else
      this.drawImage();
    this._drawSubviews();
  },
  drawImage : function() {
      var p = this.convertPointToView(this.origin,this.rootview);
      this.ctx.drawImage(this.image , p.x , p.y , this.bounds.width , this.bounds.height );          
  }
});
