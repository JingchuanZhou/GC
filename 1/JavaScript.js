var canvasState = -1; 
var points = []; // array for store point
var brush = 1; // line size in pixels
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
canvas.fillStyle = "#000000";

//Clear canvas
function clearCanvas() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
}

//draw function
function isLine() {
    canvasState = 0;
    
}

function isCircle(){
    canvasState = 1;

}

function isEllipse() {
    canvasState = 2;
      
}

function isRectangle() {
    canvasState = 3;
    points = [];

}

function isPolygon() {
    if (points.length > 5 && canvasState == 4) {
        drawLine(points[points.length - 2], points[points.length - 1],
                 points[0], points[1], context);
    }
    canvasState = 4;
    points = [];

}

function isPolyline() {

    canvasState = 5;
    points = [];
  
}

//MouseEvent Function
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: parseInt(evt.clientX - rect.left),
        y: parseInt(evt.clientY - rect.top)
    };
}
function down(x, y) {

    // drawing line, circle and ellipse
    if (canvasState == 0 || canvasState == 1 || canvasState == 2) {
    	context.clearRect(0, 0, canvas.width, canvas.height);
       	points.push(x, y);
    }

    // drawing  rectangle
    else if (canvasState == 3) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        points.push(x, y);
    }

    // drawing  polygon and polyline
    else if( canvasState == 4 || canvasState == 5){
			if (points.length == 0) {
            	context.clearRect(0, 0, canvas.width, canvas.height);
            	points.push(x, y);
        	} 
       		else {
            	context.clearRect(0, 0, canvas.width, canvas.height);
            	var ptx = points[0]; 
                var pty = points[1];
            	for (i = 2; i + 1 < points.length; i = i + 2) {
                	drawLine(ptx, pty, points[i], points[i + 1], context);
                	ptx = points[i];
                	pty = points[i + 1];
            	}
            	drawLine(ptx, pty, x, y, context);
        	}    	
    }
}


function drag(x, y) {
    
    // drawing a line
    if (canvasState == 0) {    
        points[2] = x; points[3] = y;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawLine(points[0], points[1], points[2], points[3], context);
    } 	

    // drawing a circle
    else if (canvasState == 1 ) {
        points[2] = x; points[3] = y;
        drawCircle(points[0], points[1], points[2], points[3], canvas, context);
    }

    // drawing a ellipse
    else if (canvasState == 2) {
        points[2] = x; points[3] = y;
        drawEllipse(points[0], points[1], points[2], points[3], canvas, context);
    }

    // drawing a rectangle
    else if (canvasState == 3) {   
        points[2] = x; points[3] = y;
        context.clearRect(0, 0, canvas.width, canvas.height);
        var x0 = points[0]; var y0 = points[1];
        var x1 = points[2]; var y1 = points[3];
        drawLine(x0, y0, x1, y0, context);
        drawLine(x1, y0, x1, y1, context);
        drawLine(x1, y1, x0, y1, context);
        drawLine(x0, y1, x0, y0, context);
    }

    // drawing a polygon/polyline
    else if(canvasState == 4 || canvasState == 5){
        context.clearRect(0, 0, canvas.width, canvas.height);
        var ptx = points[0]; var pty = points[1];
        for (i = 2; i + 1 < points.length; i = i + 2) {
            drawLine(ptx, pty, points[i], points[i + 1], context);
            ptx = points[i];
            pty = points[i + 1];
        }
        drawLine(ptx, pty, x, y, context);

    }
}

function up(x,y) {
    
    // finished drawing a line/circle
    if (canvasState == 0 || canvasState == 1 || canvasState == 2) {    
        points = [];
    }

    // finished drawing a rectangle
    else if (canvasState == 3) {
        
        points = [];
    } 

    // finished one line in the polygon
    else if(canvasState == 4 ){
        
        points.push(x, y);
        var ptx = points[0]; var pty = points[1];
        drawLine(ptx, pty, x, y, context);
    }

    // finished one line in the polyline
    else if(canvasState == 5){
        points.push(x,y);
    }
}

// Mouse Action Funtion
window.onload = function () {

    var mousedown = false;
	
    canvas.addEventListener('mousedown', function (evt) {
        mousedown = true;
        var mousePos = getMousePos(canvas, evt);
        down(mousePos.x, mousePos.y);
    });

    canvas.addEventListener('mousemove', function (evt) {
        if (mousedown) {
            var mousePos = getMousePos(canvas, evt);
            drag(mousePos.x, mousePos.y);
        }
    });

    canvas.addEventListener('mouseup', function (evt) {
        if (mousedown) {
            var mousePos = getMousePos(canvas, evt);
            up(mousePos.x, mousePos.y);
        }
        mousedown = false;
    });

    canvas.addEventListener('mouseover', function (evt) {
        mousedown = false;
    });

    canvas.addEventListener('mouseout', function (evt) {
        mousedown = false;
    });

}

//Implementation of midpoint algorithms
function drawLine(x0, y0, x1, y1, cxt) {

    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);

    var DX = 1;
    var DY = 1;

    if (x0 > x1) {
        DX = -DX;
    }
    if (y0 > y1) {
        DY = -DY;
    }

    var ERROR;
    if (dx > dy) {
        ERROR = dx / 2;
    } else {
        ERROR = -dy / 2;
    }

    while (true) {

        cxt.fillRect(x0, y0, brush, brush);

        if (DX > 0 && DY > 0 && x0 >= x1 && y0 >= y1) {
            break;
        } else if (DX > 0 && DY < 0 && x0 >= x1 && y0 <= y1) {
            break;
        } else if (DX < 0 && DY > 0 && x0 <= x1 && y0 >= y1) {
            break;
        } else if (DX < 0 && DY < 0 && x0 <= x1 && y0 <= y1) {
            break;
        }

        if (ERROR > -dx) {
            ERROR = ERROR - dy;
            x0 = x0 + DX;
        }

        if (ERROR < dy) {
            ERROR = ERROR + dx;
            y0 = y0 + DY;
        }
    }
}


function drawCircle(x0, y0, x1, y1, c, cxt) {


    cxt.clearRect(0, 0, c.width, c.height);

    var r = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    var x = r;
    var y = 0;
    var z = 1 - x;

    while (x >= y) {

        cxt.fillRect(x + x0, y + y0, brush, brush);
        cxt.fillRect(y + x0, x + y0, brush, brush);
        cxt.fillRect(-x + x0, y + y0, brush, brush);
        cxt.fillRect(-y + x0, x + y0, brush, brush);
        cxt.fillRect(-x + x0, -y + y0, brush, brush);
        cxt.fillRect(-y + x0, -x + y0, brush, brush);
        cxt.fillRect(x + x0, -y + y0, brush, brush);
        cxt.fillRect(y + x0, -x + y0, brush, brush);

        y = y + 1;

        if (z < 0) {
            z = z + (2 * y) + 1;
        } else {
            x = x - 1;
            z = z + (2 * (y - x)) + 1;
        }
    }
}

function drawEllipse(xc, yc, xRadius, yRadius, c, cxt) {

    // clear the canvas
    cxt.clearRect(0, 0, c.width, c.height);

    // midpoint ellipse algorithm
    var RXsquare = xRadius * xRadius;
    var RYsquare = yRadius * yRadius;
    var x = 0;
    var y = yRadius;
    var px = 0;
    var py = 2 * RXsquare * y;

    ellipsePts(xc, yc, x, y, cxt);
    var p = RYsquare - (RXsquare * yRadius) + (0.25 * RXsquare);

    while (px < py) {

        x = x + 1;
        px = px + 2 * RYsquare;

        if (p < 0) {
            p = p + RYsquare + px;
        } else {
            y = y - 1;
            py = py - 2 * RXsquare;
            p = p + RYsquare + px - py;
        }

        ellipsePts(xc, yc, x, y, cxt);
    }

    p = RYsquare * Math.pow(x + 0.5, 2) + RXsquare *
        Math.pow(y - 1, 2) - RXsquare * RYsquare;

    while (y > 0) {

        y = y - 1;
        py = py - 2 * RXsquare ;

        if (p > 0) {
            p = p + RXsquare - py;
        } else {
            x = x + 1;
            px  = px + 2 * RYsquare;
            p = p + RXsquare - py + px;
        }

        ellipsePts(xc, yc, x, y, cxt);
    }
}

function ellipsePts(xc, yc, x, y, cxt) {

    cxt.fillRect(xc + x, yc + y, brush, brush);
    cxt.fillRect(xc - x, yc + y, brush, brush);
    cxt.fillRect(xc + x, yc - y, brush, brush);
    cxt.fillRect(xc - x, yc - y, brush, brush);
}

// check array for stackoverflow 
Array.prototype.contains = function (k) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === k) {
            return true;
        }
    }
    return false;
}