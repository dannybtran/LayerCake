module("LayerCake.js");

test("get_root returns a singleton", function() {
  same(LayerCake.get_root(canvas),LayerCake.get_root(canvas),"get_root is a singleton");
});

test("next_view_id increments after root is created", function() {
  equals(1,LayerCake.next_view_id,"next_view_id equals 1");
});