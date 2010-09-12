module("LayerCake.js");

test("bake returns a singleton", function() {
  same(LayerCake.bake(canvas),LayerCake.bake(canvas),"bake is a singleton");
});

test("next_view_id increments after root is created", function() {
  equals(1,LayerCake.next_view_id,"next_view_id equals 1");
});