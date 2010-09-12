LayerCake: Javascript Library
=============================
[http://www.dannytran.me/layercake/](http://www.dannytran.me/layercake/)

Creating clickable/draggable elements on the canvas is easy.

Grab the root view like so:

    var root = LayerCake.bake('canvasId');

Create a rectangle, make it draggable and give it a click callback:

    var r1 = new RectView(0,0,200,50);
    r1.draggable = true;
    r1.click(function(event) {
      alert('you clicked me!');
    });

Add it to the rootview:

    root.addSubview(r1);

Draw the rootview:

    root.draw();

For more detail see the examples:  
[Example 1](http://dannytran.me/layercake/example1.html)  
[Example 2](http://dannytran.me/layercake/example2.html)

Copyright (c) 2010 Danny Tran
MIT License
http://www.opensource.org/licenses/mit-license.php

