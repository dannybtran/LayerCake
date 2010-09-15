/*
  Copyright (c) 2010 Danny Tran
  MIT License
  http://www.opensource.org/licenses/mit-license.php
*/

/*
  Class: Point
  An object that has x and y parameters.  Point can be treated like a vector and has many vector methods.
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
  
  /*
    Function: (Point)add
    Adds a point to the current point and returns the new point. 
    
    Parameters:
      p - A <Point>
    
    Returns:
      Point
  */  
  add : function(p) {
    return new Point(this.x + p.x, this.y + p.y);    
  },
  
  /*
    Function: (Point)subtract
    Subtracts a point from the current point and returns the new point. 
    
    Parameters:
      p - A <Point>
    
    Returns:
      Point
  */  
  subtract : function(p) {
    return new Point(this.x - p.x, this.y - p.y);
  },

  /*
    Function: (Point)multiply
    Multiplies a point by a scalar value and returns the new point. 
    
    Parameters:
      c - A number
    
    Returns:
      Point
  */  
  multiply : function(c) {
    return new Point(this.x * c, this.y * c);    
  },
  
  /*
    Function: (Point)divide
    Divides a point by a scalar value and returns the new point. 
    
    Parameters:
      c - A number
    
    Returns:
      Point
  */   
  divide : function(c) {
    return new Point(this.x / c, this.y / c);
  },
  
  /*
    Function: (Number)mag
    Returns the magnitude of the current Point.
    
    Parameters:
      None
    
    Returns:
      Number
  */   
  mag : function() {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
  },
  
  /*
    Function: (Point)dot
    Returns the dot product of a point and the current point.
    
    Parameters:
      p - A <Point>
    
    Returns:
      Number
  */   
  dot : function(p) {
    return this.x * p.x + this.y * p.y;
  }
});