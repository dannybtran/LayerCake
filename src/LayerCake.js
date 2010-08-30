/*
  Class: LayerCake
  A holder for config vars and the root view singleton
*/
var LayerCake = {
  /*
    Function: get_root
    
    Returns a singleton instance of RootView
    
    Parameters:
      
      canvas - The canvas DOM element
      
    Returns:
    
      RootView object
  */
  get_root : function(canvas) {
    if (!this.root)
      this.root = new RootView(canvas);
    return this.root;
  },
  /*
    Variable: next_view_id
    
    An auto_increment variable for all views
  */
  next_view_id : 0
};