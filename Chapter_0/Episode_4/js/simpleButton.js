let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", handleWindowResize);
function handleWindowResize()
{
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

function draw()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = "magenta";
	context.fillRect(halfCanvasW - halfRectW, halfCanvasH - halfRectH, rectW, rectH);
	
	context.fillStyle = "red";
	context.fillRect(0, 0, rectW, rectH);
	
	context.fillStyle = "white";
	context.fillRect(canvas.width - rectW, 0, rectW, rectH);
	
	context.fillStyle = "blue";
	context.fillRect(0, canvas.height - rectH, rectW, rectH);
	
	context.fillStyle = "green";
	context.fillRect(canvas.width - rectW, canvas.height - rectH, rectW, rectH);
}

draw();

