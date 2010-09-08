module("View.js");

test("Constructor", function() {
  var current_view_id = LayerCake.next_view_id;
  var v = new View(3,4);    
  var next_view_id = current_view_id + 1;
  same(new Point(3,4),v.origin,"View sets origin to (3,4)");
  equals(current_view_id,v.id,"Sets id to LayerCake.next_view_id");  
  equals(next_view_id,LayerCake.next_view_id,"Increments LayerCake.next_view_id");
});

test("_relate", function() {
  var v = new View(0,0), v1 = new View(0,0), v2 = new View(0,0), sv = new View(3,3);
  sv.rootview = "rootview";
  sv.canvas = "canvas";
  sv.ctx = "ctx";
  v.rootview = null;
  v.canvas = null;
  v.ctx = null;
  v.superview = null;
  v2._relate = function(view,superview) {
    ok(true,"Calls _relate on subview");
  }
  v.subviews = [v2,v2,v2];
  v1._relate(v,sv);
  equals(v.rootview,sv.rootview,"Sets view.rootview to superview.rootview");
  equals(v.canvas,sv.canvas,"Sets view.canvas to superview.canvas");  
  equals(v.ctx,sv.ctx,"Sets view.ctx to superview.ctx");    
  same(v.superview,sv,"Sets view.superview to superview");    
})

test("_draw", function() {
  var v1 = new View(0,0);
  var v2 = new View(0,0);
  v1.draw = function() {
    ok(true,"Calls draw()");
  }
  v2._draw = function() {
    ok(true,"Calls _draw() on subviews");
  }
  v1.subviews = [v2,v2,v2];  
  v1._draw();
});

test("_click",function() {
  var v1 = new View(0,0);
  var v2 = new View(0,0);  
  var v3 = new View(0,0);    
  var v4 = new View(0,0);      
  var recurseCalls = [];
  var event = {};
  v4._click = function(event) {
    recurseCalls.push(this.id);
  };
  v3._click = v4._click;
  v2._click = v3._click;
  v1.subviews = [v2,v3,v4];
  v1._click(event);
  same([v4.id,v3.id,v2.id],recurseCalls,"Calls _click on subviews in reverse order");
});