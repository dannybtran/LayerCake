/*
  Copyright (c) 2010 Danny Tran
  MIT License
  http://www.opensource.org/licenses/mit-license.php
*/

/*
  Class: View
  The base class for displayable sections in LayerCake.
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
    this.id = LayerCake.auto_increment();
    
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
    
    this.lockHorizontalDrag = false;
    this.lockVerticalDrag = false;
    
    this._dragOrigin;
    this._dragPoint;
    this._mouseDownOrigin;
    this._mousedOver = false;
    this._mousedOut = true;    
  },
  
  /* PRIVATE METHODS */

  /*
    _relate: Recursive method, called by addSubview and relates target views to superviews.
    Passing through the rootview, canvas, ctx and superview values.
  */
  _relate : function(view,superview) {
    view.rootview = (superview instanceof RootView) ? superview : superview.rootview;   
    view.superview = superview;    
    view.canvas = superview.canvas; 
    view.ctx = superview.ctx; 
    for(var k in view.subviews) { view.subviews[k]._relate(view.subviews[k],view); }
    return view;
  },
  
  /*
    _drawSubviews : Recursively draws all subviews
  */  
  _drawSubviews : function() {
    for(var k in this.subviews) { if (this.subviews[k].visible) this.subviews[k].draw(); }
  },

  /*
    _click : Recursively calls _click on all subviews.  If the subview returns true, end the loop.
    If view is clickable, hasn't been dragged, and the mouse point is "in the view" (determined
    by overriden pointInView methods) it calls the click handler and returns true.
  */  
  _click : function(event) {
    if (!this.visible) return false;
    
    for(var k = this.subviews.length - 1; k >= 0; k--) {
      if (this.subviews[k]._click(event))
        return true;
    }

    if (!this.pointInView(new Point(event.clientX,event.clientY))) 
      return false;
      
    if (this._clickableMouseHasNotMoved()) {
      this._mouseDownOrigin = null;
      this._clickHandler(event);
    }
    
    return true;
  },
  
  _clickableMouseHasNotMoved : function() {
    if (!this._mouseDownOrigin) return false;
    return this.clickable && this._mouseDownOrigin.equals(this.convertPointToWindow(this.origin));
  },
  
  _clickHandler : function(event) { },
  
  /*
    _mousedown : Recursively calls _mousedown on all subviews.  If the subview returns true, end the loop.
    If view is draggable and the mouse point is "in the view" (determined by overriden pointInView methods) 
    it calls the mousedown handler and starts the drag process.
  */   
  _mousedown : function(event) {
    if (!this.visible) return false;
    
    for(var k = this.subviews.length - 1; k >= 0; k--) {
      if (this.subviews[k]._mousedown(event))
        return true;
    }    
    
    if (!this.pointInView(new Point(event.clientX,event.clientY)))
      return false;
      
    this._mouseDownOrigin = this.convertPointToWindow(this.origin);      
    this._mousedownHandler(event);
    
    if (!this.draggable || this.isDragging)
      return false;
    
    this._startDrag(event);      
    return true;
  },
  
  _mousedownHandler : function(event) { },
  
  /*
    _mouseup : Recursively calls _mouseup on all subviews.  If the subview returns true, end the loop.
    Calls mouseup handler and if view is dragging, stops dragging.
  */     
  _mouseup : function(event) {
    if (!this.visible) return false;
    
    for(var k in this.subviews) {
      if (this.subviews[k]._mouseup(event))
        return false;
    }        
        
    this._mouseupHandler(event);
    
    if (this.isDragging) this._stopDrag(event);      
    
    return false;
  },  
  
  _mouseupHandler : function(event) { },
  
  /*
    _mousemove : If view is dragging, move view relative to _dragPoint. Recursively calls _mousemove on all
    subviews.  If the subview returns true, end the loop. If mouse point is in view and view is not moused over
    call mouseover.  Else if the mouse point is not in the view and view has not been moused out, call mouseout.
    Set flags.
  */     
  _mousemove : function(event) {      
    if (!this.visible) return false;
    
    if (this.isDragging) {
      var delta = new Point(event.clientX - this._dragPoint.x , event.clientY - this._dragPoint.y);
      this.origin = new Point(
        (!this.lockHorizontalDrag) ? this._dragOrigin.x + delta.x : this.origin.x, 
        (!this.lockVerticalDrag)   ? this._dragOrigin.y + delta.y : this.origin.y
      );
      this.rootview.draw();
      return true;
    }

    for(var k in this.subviews) {
      if (this.subviews[k]._mousemove(event))
        return false;
    }      
    
    if (this.pointInView(new Point(event.clientX,event.clientY))) {
      this._mousemoveHandler(event);    
      if (!this._mousedOver)
        this._mouseover(event);
      //return true;
    } else {
      if (!this._mousedOut)
        this._mouseout(event);
    }
    
    return false;
  },
  
  _mousemoveHandler : function(event) { },
  
  /*
    _mouseover : call mouseover handler
  */
  _mouseover : function(event) {
    //this.rootview.map(function() { this._mouseout(event); });
    this._mousedOver = true;
    this._mousedOut = false;    
    this._mouseoverHandler(event);
  },
  
  _mouseoverHandler : function(event) { },
  
  /*
    _mouseout : call _mouseout handler
  */
  _mouseout : function(event) {
    this._mousedOver = false;
    this._mousedOut = true;    
    this._mouseoutHandler(event);
  },
  
  _mouseoutHandler : function(event) { },
  
  /*
    _startDrag : Note the dragPoint and dragOrigin and start the drag process
  */
  _startDrag : function(event) {
    this._dragOrigin = this.origin;
    this._dragPoint = new Point(event.clientX,event.clientY);
    this.isDragging = true;
  },

  /*
    _stopDrag : Stop the drag process
  */
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
    view = this._relate(view,this);
    this.subviews.push(view);
  },  
  
  /*
    Function: (boolean) removeSubview
    
    Removes a subview from the current view
    
    Parameters:
      view - the subview to be removed
    
    Returns:
      True if the view was successfully removed.  False if the view was not found.
  */  
  removeSubview : function(view) {
    for(var k = 0; k < this.subviews.length; k++) {
      if (view.id == this.subviews[k].id) {
        this.subviews.splice(k,1);
        return true;
      }
    }
    return false;
  },
  
  /*
    Function: (void) draw
    
    Draws the current view.  It's probably best not to call draw directly on a subview, 
    but instead call it on the rootview. e.g. this.rootview.draw();
    
    Override draw() when extending View.  Make sure to include a call to
    this._drawSubviews() if you want the subviews to be drawn.
    
    Returns:
      void
  */  
  draw : function() { this._drawSubviews(); },  
  
  /*
    Function: (void) click
    
    Assigns the callback function for click events.

    Parameters:
      foo - A function that accepts an 'event' parameter
      
    Returns:
      void
  */
  click : function(foo) { 
    this.clickable = true;
    this._clickHandler = foo; 
  },  
  
  /*
    Function: (void) mousedown
    
    Assigns the callback function for mousedown events.
    
    Parameters:
      foo - A function that accepts an 'event' parameter
      
    Returns:
      void
  */  
  mousedown : function(foo) { this._mousedownHandler = foo; },  
  
  /*
    Function: (void) mouseup
    
    Assigns the callback function for mouseup events.
    
    Parameters:
      foo - A function that accepts an 'event' parameter
      
    Returns:
      void
  */    
  mouseup : function(foo) { this._mouseupHandler = foo; },  

  /*
    Function: (void) mousemove
    
    Assigns the callback function for mousemove events.
    
    Parameters:
      foo - A function that accepts an 'event' parameter
      
    Returns:
      void
  */    
  mousemove : function(foo) { this._mousemoveHandler = foo; }, 

  /*
    Function: (void) mouseover
    
    Assigns the callback function for mouseover events.
    
    Parameters:
      foo - A function that accepts an 'event' parameter
      
    Returns:
      void
  */  
  mouseover : function(foo) { this._mouseoverHandler = foo; },
  
  /*
    Function: (void) mouseout
    
    Assigns the callback function for mouseout events.

    Parameters:
      foo - A function that accepts an 'event' parameter
      
    Returns:
      void
  */  
  mouseout : function(foo) { this._mouseoutHandler = foo; },
  
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
      A <Point> object
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
    This takes into account the position of the canvas tag within the browser as well as scroll coordinates.
    
    Parameters:
      p - A point
      
    Returns:
      A <Point> object
  */
  convertPointToWindow : function(p) {
    var np = this.convertPointToView(p,this.rootview);
    //TODO: X-browser check this
    return new Point(np.x + this.canvas.offsetLeft - window.scrollX, 
      np.y + this.canvas.offsetTop - window.scrollY);
  },
  
  /*
    Function: (void) map
    
    Call a function on all recursive subviews of the current view.
    
    Parameters:
      foo - a function
      
    Returns:
      void
  */  
  map : function(foo) {
    for(var k in this.subviews)
      this.subviews[k].map(foo)
    // give the foo function access to 'this' scope
    this.tempFoo = foo; 
    this.tempFoo();
    this.tempFoo = null;
  }
});