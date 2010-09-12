/*
  Copyright (c) 2010 Danny Tran
  MIT License
  http://www.opensource.org/licenses/mit-license.php
*/

/*
  Class: LayerCake
  A holder for config vars and the root view singleton
*/
var LayerCake = {
  /*
    Variable: next_view_id
    
    An auto_increment variable for all views
  */
  next_view_id : 0,
    
  /*
    Function: bake
    
    Returns a singleton instance of RootView
    
    Parameters:
      
      canvas - The id of the canvas element or the element itself.
      
    Returns:
    
      RootView object
  */
  bake : function(canvas) {
    if (!this.root) {
      switch(typeof(canvas)) {
        case "object":
          var c = canvas;
          break;
        case "string":
          var c = document.getElementById(canvas);
          break;
      }
      this.root = new RootView(c);
    }
    return this.root;
  },
  
  /*
    Function: auto_increment
    
    Returns the current view id and increments it.
    
    Parameters:
      
      None
      
    Returns:
    
      integer
  */  
  auto_increment : function() {
    return this.next_view_id++;
  }
};