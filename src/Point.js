/*
  Copyright (c) 2010 Danny Tran
  MIT License
  http://www.opensource.org/licenses/mit-license.php
*/

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
  },
  add : function(p) {
    return new Point(this.x + p.x, this.y + p.y);    
  },
  subtract : function(p) {
    return new Point(this.x - p.x, this.y - p.y);
  },
  multiply : function(c) {
    return new Point(this.x * c, this.y * c);    
  },
  divide : function(c) {
    return new Point(this.x / c, this.y / c);
  },
  mag : function() {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
  },
  dot : function(p) {
    return this.x * p.x + this.y * p.y;
  }
});