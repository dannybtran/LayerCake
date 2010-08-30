var RectView = View.extend({
  init : function(x,y,width,height) {
    this._super(x,y);
    this.bounds = { width : width, height : height };
    this.fillStyle = '#000';
  },
  draw : function() {
    this.ctx.fillStyle = this.fillStyle;
    var p = this.convertPointToView(this.origin,this.rootview);
    this.ctx.fillRect( p.x , p.y , this.bounds.width , this.bounds.height );
  },
  pointInView : function(p) {
    var origin = this.convertPointToWindow(this.origin);
    if (p.x >= origin.x && p.x <= origin.x + this.bounds.width &&
        p.y >= origin.y && p.y <= origin.y + this.bounds.height )
      return true;
  },
  click : function(event) { }
});
