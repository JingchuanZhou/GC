var canvas = document.querySelector('canvas');

var c = canvas.getContext("2d");
var style = c.strokeStyle;
var lineWidth = c.lineWidth;
var lineJoin = c.lineJoin;
var deg = Math.PI / 180;

function clearCanvas(){
	c.clearRect(0, 0, canvas.width, canvas.height);
}

//draw circle in the center of canvas, radius is the only parameter
function drawCircle(r){
	x = canvas.width/2;
	y = canvas.height/2;
	radius = r;
	c.beginPath();
	c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.stroke();
}

//draw small circle for the wheel
function drawSmallCircle(r, xx, yy){
	x = xx;
	y = yy;
	radius = r;
	c.beginPath();
	c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.stroke();
}

//draw polygon for problem 2
function drawPolygon(edges, radius){
	var numberOfSides = edges,
    size = radius,
    Xcenter = canvas.width/2,
    Ycenter = canvas.height/2;
	c.lineWidth = lineWidth;
	c.beginPath();
	c.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          
 
	for (var i = 1; i <= numberOfSides;i += 1) {
    	c.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
	}
 
	c.stroke();
}

//draw ellipse for problem 2
function drawEllipse(radius, score){
	var x = canvas.width/2;
	var y = canvas.height/2;
	var radiusX = radius;
	var radiusY = radius * (score/100);
	var rotation = Math.PI/180 * 0;
	var startAngle = 0;
	var endAngle = Math.PI * 2;
	var anticlockwise = false;

	c.beginPath();
	c.lineWidth = lineWidth;
	c.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
	c.stroke();


}

//draw the inner part of the wheel
function drawInner(radius){
	var small_radius = radius/2.4;
	drawCircle(radius);
	for(var i = 0; i < 5; i++){
		var small_x = canvas.width/2 + (radius*1.5)* Math.cos(i * 2 * Math.PI / 5);
		var small_y = canvas.height/2 + (radius*1.5)* Math.sin(i * 2 * Math.PI / 5);
		drawSmallCircle(small_radius, small_x, small_y);
	}
	drawCircle(radius * 2.1);
}

//Main function of problem 2
function drawWheel(){
	
	var radius = document.getElementById("radius").value;
	var score = document.getElementById("score").value;


	if(score == 100){
		clearCanvas();

		drawCircle(radius);	
		drawCircle(radius*0.8);	
		drawInner(radius/5);

	} else if(score < 100 && score >79){
		clearCanvas();

		drawEllipse(radius, score);
		drawEllipse(radius*0.8, score);
		drawInner(radius/5);

	} else if(score >=4 && score <=79){
		clearCanvas();

		drawPolygon(score, radius);	
		drawPolygon(score, radius*0.8);	
		drawInner(radius/5);

	} else {
		window.alert("Drive score must lie in [4, 100]");
	}

	
}

// function changeScore(){
// 	// window.alert("changeRaduisScore()");
// 	var e = document.getElementById("driver");
// 	var index = e.selectedIndex;


// 	// var score = document.getElementById("p2").elements.item(1).value;
// 	if(index == 0){
// 		// window.alert("index == 1");
// 		document.getElementById("p2").elements.item(1).value = 100;
// 	} else if(index == 1){
// 		document.getElementById("p2").elements.item(1).value = 80;
// 		// window.alert("index == 2");
// 	} else if(index == 2){
// 		document.getElementById("p2").elements.item(1).value = 8;
// 		// window.alert("index == 3");
// 	}
// }

// function changeLineJoin(){
// 	var e = document.getElementById("lineJoin");
// 	var index = e.selectedIndex;


// 	if(index == 0){
// 		// window.alert("Line join index == 1");
// 		c.lineJoin = "round";
// 	} else if(index == 1){
// 		// window.alert("Line join index == 2");
// 		c.lineJoin = "bevel";
// 	} else if(index == 2){
// 		// window.alert("Line join index == 3");
// 		c.lineJoin = "miter";
// 	}
// }
