var ImageView = View.extend({
  init : function(src,x,y,width,height) {
    this._super(x,y);
    this.src = src;
    this.image = new Image();
    this.bounds = { width : width, height : height };
    this.fillStyle = '#000';
  },
  draw : function() {
    if(this.image.src != this.src) { 
      this.image.src = this.src;
      this.src = this.image.src;
      this.image.onload = (function(self) { return function() { self._draw(); } })(this);
    } else
      this.drawImage();
  },
  drawImage : function() {
      var p = this.convertPointToView(this.origin,this.rootview);
      this.ctx.drawImage(this.image , p.x , p.y , this.bounds.width , this.bounds.height );          
  },
  pointInView : function(p) {
    var origin = this.convertPointToWindow(this.origin);
    if (p.x >= origin.x && p.x <= origin.x + this.bounds.width &&
        p.y >= origin.y && p.y <= origin.y + this.bounds.height )
      return true;
  },
  click : function(event) { }
});
