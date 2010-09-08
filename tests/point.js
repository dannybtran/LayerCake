module("Point.js");

test("Constructor",function() {
  var p = new Point(-1,-2);
  equals(-1,p.x,"x value is stored.");
  equals(-2,p.y,"y value is stored.");  
  
  var p2 = new Point(3,4);
  ok(!p.equals(p2),'(-1,-2) equals (3,4)?');
  
  var p3 = new Point(-1,-2);
  ok(p.equals(p3),'(-1,-2) equals (-1,-2)?');
  
});