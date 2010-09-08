/*
  Class: Point
  An object that has x and y parameters.
*/
var Point = Class.extend({
  /* 
    Constructor: Point 
    Create and return a Point object.
  
    Parameters:
      x - a number
      y - a number
  */
  init: function(x,y) {
    /*
      Variable: x
      The x coordinate of the point
    */
    this.x = x;

    /*
      Variable: y
      The y coordinate of the point
    */  
    this.y = y;
  },
  
  /*
    Function: (Boolean)equals
    Determines if two points are equal
    
    Parameters:
      p - A <Point>
    
    Returns:
      Boolean
  */
  equals: function(p) {
    if (this.x == p.x && this.y == p.y) return true;
    return false;
  }
});