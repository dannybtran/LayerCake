/*
  Class: Point
  An object that has x and y parameters.
*/

/* 
  Constructor: Point 
  Create and return a Point object.
  
  Parameters:
    x - a number
    y - a number
*/
var Point = function(x,y) {
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
  
  return this;
}