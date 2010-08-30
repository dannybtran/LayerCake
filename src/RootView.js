var RootView = View.extend({
    init : function(canvas) {
      this._super(0,0);

      this.canvas = canvas;
      this.ctx = canvas.getContext("2d"); 
      
      // set canvas equal to window width
      // TODO: Cross browser check
      canvas.width  = document.body.clientWidth;
      canvas.height = document.body.clientHeight - 4;

      this.isRoot = true;
      this.canvas.addEventListener('click',this.click,true);
      this.canvas.addEventListener('mousedown',this.mousedown,true);
      this.canvas.addEventListener('mouseup',this.mouseup,true);      
      this.canvas.addEventListener('mousemove',this.mousemove,true);      
    },
    draw : function() {
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
      this._draw();
    },
    click : function(event) {
      var root = LayerCake.get_root();
      for(var k in root.subviews) {
        if (root.subviews[k]._click(event))
          return;
      }
    },
    mousedown : function(event) {
      var root = LayerCake.get_root();
      for(var k in root.subviews) {
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