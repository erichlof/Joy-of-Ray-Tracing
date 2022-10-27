let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", handleWindowResize);
function handleWindowResize()
{
	// get the new window dimensions and update the halfCanvasW and H variables
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	halfCanvasW = canvas.width / 2;
	halfCanvasH = canvas.height / 2;

	draw();
}

let text = document.getElementById("myText");
window.addEventListener("mousedown", handleMouseDown);
function handleMouseDown()
{
	text.innerHTML = "You pressed the mouse!";
}

window.addEventListener("mouseup", handleMouseUp);
function handleMouseUp()
{
	text.innerHTML = "This is some text";
}

let button = document.getElementById("myButton");
button.addEventListener("click", handleButtonClick);
function handleButtonClick()
{
	rectW = Math.random() * 200 + 5;
	rectW = Math.floor(rectW);
	halfRectW = rectW / 2;
	rectH = Math.random() * 200 + 5;
	rectH = Math.floor(rectH);
	halfRectH = rectH / 2;

	draw();
}

let halfCanvasW = canvas.width / 2;
let halfCanvasH = canvas.height / 2;

let rectW = 40;
let rectH = 20;

let halfRectW = rectW / 2;
let halfRectH = rectH / 2;

let colorString = "rgb(255,0,0)";
let r = 0;
let g = 0;
let b = 0;

function randomizeColorString()
{
	// create a new string with the form "rgb(255,255,255)"
	r = Math.random() * 256;
	r = Math.floor(r);

	g = Math.random() * 256;
	g = Math.floor(g);

	b = Math.random() * 256;
	b = Math.floor(b);

	colorString = "rgb(" + r + "," + g + "," + b + ")";
}


function draw()
{
	context.clearRect(0, 0, canvas.width, canvas.height);

	randomizeColorString();
	context.fillStyle = colorString;
	context.fillRect(halfCanvasW - halfRectW, halfCanvasH - halfRectH, rectW, rectH);

	randomizeColorString();
	context.fillStyle = colorString;
	context.fillRect(0, 0, rectW, rectH);

	randomizeColorString();
	context.fillStyle = colorString;
	context.fillRect(canvas.width - rectW, 0, rectW, rectH);

	randomizeColorString();
	context.fillStyle = colorString;
	context.fillRect(0, canvas.height - rectH, rectW, rectH);

	randomizeColorString();
	context.fillStyle = colorString;
	context.fillRect(canvas.width - rectW, canvas.height - rectH, rectW, rectH);
}

draw();