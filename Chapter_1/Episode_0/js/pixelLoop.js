let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let userInfo = document.getElementById("userInfo");
userInfo.innerHTML = "canvasW: " + canvas.width + " canvasH: " + canvas.height + "<br>" + 
"total pixel count: " + (canvas.width * canvas.height);

context.fillStyle = "magenta";
context.fillRect(canvas.width / 2, canvas.height / 2, 1, 1);

let canvasX = 0;
let canvasY = 0;
let r = 0;
let g = 0;
let b = 0;

// loop over all pixels on screen
for (let row = 0; row < canvas.height; row++)
{
	for (let column = 0; column < canvas.width; column++)
	{
		canvasX = column / (canvas.width - 1);
		canvasY = row / (canvas.height - 1);
		// if (row == 0)
		// {
		// 	console.log("canvasX is " + canvasX);
		// }

		// canvasX goes from 0.0 to 1.0

		r = canvasX * 255;
		r = Math.floor(r);
		
		g = canvasY * 255;
		g = Math.floor(g);

		b = (1 - canvasX) * 255;
		b = Math.floor(b);

		//"rgb(r,g,b)"
		context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		context.fillRect(column, row, 1, 1);
	}
	///console.log("canvasY is " + canvasY);
}