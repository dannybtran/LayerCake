/*
  Class: View
  The base class for displayable sections in LayerCake.  Extend this class to create your own custom view.
*/
var View = Class.extend({
  
  /*
    Constructor: View
    
    Initializes the object.  var view = new View(0,0);
    
    Parameters:
       x - The x coordinate of the view
       y - The y coordinate of the view       
  */
  init : function(x,y) {
    /*
      Variable: (Number) id
      An auto_incremented id
    */
    this.id = LayerCake['next_view_id']++;
    
    /*
      Variable: (Point) origin
      The origin coordinate of the view
    */
    this.origin = new Point(x,y);
    
    /*
      Variable: (Object) bounds
      The width and height of the view accessed by bounds.width and bounds.height
    */
    this.bounds = { width : 0 , height : 0 };
    
    /*
      Variable: (DOM Node) canvas
      A reference to the DOM canvas element.  If this view is not a subview of rootview it will be null.
    */
    this.canvas = null;
    
    /*
      Variable: (Canvas context) ctx
      A reference to the 2D context of the canvas object
    */
    this.ctx = null;
    
    /*
      Variable: (View) rootview
      A reference to the rootview
    */
    this.rootview = null;
    
    /*
      Variable: (View) superview
      A reference to the parent view of the current view
    */
    this.superview = null;
    
    /*
      Variable: (Array) subviews
      An array of child views of the current view
    */
    this.subviews = [];

    /*
      Variable: (Boolean) visible
      If visible is false, the view and all its subviews will not be drawn.  Default is true.
    */
    this.visible = true;
    
    /*
      Variable: (Boolean) clickable
      If clickable is false, the view click delegate will not trigger.  Default is false.
    */
    this.clickable = false;
    
    /*
      Variable: (Boolean) draggable
      If draggable is false, the view cannot be dragged.  Default is false.
    */
    this.draggable = false;
    
    /*
      Variable: (Boolean) isDragging
      Returns true if the current view is being dragged.
    */
    this.isDragging = false;
    
    /*
      Variable: (Boolean) isMouseDown
      Returns true if mousedown and not mouseup has been called on the current view.
    */
    this.isMouseDown = false;

    this._dragOrigin;
    this._dragPoint;
  },
  
  /* PRIVATE METHODS */
  
  _relate : function(view,superview) {
    view.rootview = (superview.isRoot == true) ? superview : superview.rootview;   
    view.canvas = superview.canvas;
    view.ctx = superview.ctx;       
    view.superview = superview;
    for(var k in view.subviews) { view.subviews[k]._relate(view.subviews[k],view); }
    return view;
  },
  _draw : function() {
    if (!this.isRoot) this.draw();
    for(var k in this.subviews) { if (this.subviews[k].visible) this.subviews[k]._draw(); }
  },
  _click : function(event) {
    for(var k in this.subviews) {
      if (this.subviews[k]._click(event))
        return;
    }
    if (this.pointInView(new Point(event.clientX,event.clientY)) && this.clickable) {
      this.click(event);
      return true;
    } else {
      return false;
    }
  },
  _mousedown : function(event) {
    for(var k in this.subviews) {
      if (this.subviews[k]._mousedown(event))
        return;
    }    
    
    if (this.draggable && this.pointInView(new Point(event.clientX,event.clientY))) {      
      this.mousedown(event);
      if (this.draggable && !this.isDragging) this._startDrag(event);      
      return true;
    } else {
      return false;
    }
  },
  _mouseup : function(event) {
    for(var k in this.subviews) {
      if (this.subviews[k]._mouseup(event))
        return;
    }        
    this.mouseup(event);
    if (this.isDragging) this._stopDrag(event);      
    return false;
  },  
  _mousemove : function(event) {
    for(var k in this.subviews) {
      if (this.subviews[k]._mousemove(event))
        return;
    }        
    if (this.pointInView(new Point(event.clientX,event.clientY)))
      this.mousemove(event);    
    if (this.isDragging) {
      var delta = new Point(event.clientX - this._dragPoint.x , event.clientY - this._dragPoint.y);
      this.origin = new Point(this._dragOrigin.x + delta.x , this._dragOrigin.y + delta.y);
      this.rootview.draw();
    }
    return false;
  },
  _startDrag : function(event) {
    this._dragOrigin = this.origin;
    this._dragPoint = new Point(event.clientX,event.clientY);
    this.isDragging = true;
  },
  _stopDrag : function(event) {
    this.isDragging = false;
  },

  /* PUBLIC METHODS */
  
  /*
    Function: (void) addSubview
    
    Adds a subview to the current view
    
    Parameters:
      view - the object of class View to be added.
    
    Returns:
      void
  */
  addSubview : function(view) {
    if (!(view instanceof View))
      throw("Parameter must be of or extend class View")
    view = this._relate(view,this);
    this.subviews.push(view);
  },  
  
  /*
    Function: (void) draw
    
    Draws the current view.  It's probably best not to call draw on a subview, 
    but instead call it on the rootview. e.g. this.rootview.draw();  Override draw()
    when extending View.
    
    Returns:
      void
  */  
  draw : function() { },  
  
  /*
    Function: (delegate) click
    
    Called when a canvas click event has been fired and the coordinates are in this view.  
    Override this method.

    Parameters:
      event - An event
      
    Returns:
      void
  */
  click : function(event) { },  
  
  /*
    Function: (delegate) mousedown
    
    Called when a canvas mousedown event has been fired and the coordinates are in this view.
    Override this method.

    Parameters:
      event - An event
      
    Returns:
      void
    
  */  
  mousedown : function(event) { },  
  
  /*
    Function: (delegate) mouseup
    
    Called when a canvas mouseup event has been fired and the coordinates are in this view.
    Override this method.

    Parameters:
      event - An event
      
    Returns:
      void
    
  */    
  mouseup : function(event) { },  

  /*
    Function: (delegate) mousemove
    
    Called when a canvas mousemove event has been fired and the coordinates are in this view.
    Override this method.

    Parameters:
      event - An event
      
    Returns:
      void
    
  */    
  mousemove : function(event) { }, 
  
  /*
    Function: (Boolean) pointInView
    
    Determine if a point is in the current view.  Override this method.
    
    Parameters:
      p - Object of type Point
      
    Returns:
      boolean
  */
  pointInView : function(p) { return false; },
  
  /*
    Function: (Point) convertPointToView
    
    Conver a point from the current view's coordinate space to the target view's coordinate space.
    
    Parameters:
      p - A point
      view - The target view
      
    Returns:
      A Point object
  */
  convertPointToView : function(p,view) {
    var v = this;
    var tx = p.x, ty = p.y;
    while(v.superview && view != v) {
      v = v.superview;        
      tx += v.origin.x;
      ty += v.origin.y;      
    }
    return new Point(tx,ty);
  },
  
  /*
    Function: (Point) convertPointToWindow
    
    Convert a point from the current view's coordinate space to the coordinate space of the browser window.  
    This takes into account the position of the canvas tag within the browser.
    
    Parameters:
      p - A point
      
    Returns:
      A Point object
  */
  convertPointToWindow : function(p) {
    var np = this.convertPointToView(p,this.rootview);
    return new Point(np.x + this.canvas.offsetLeft, np.y + this.canvas.offsetTop);
  }
});