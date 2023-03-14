let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");



let userInfo = document.getElementById("userInfo");


window.addEventListener("resize", handleWindowResize);
function handleWindowResize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	userInfo.innerHTML = "canvasW: " + canvas.width + " canvasH: " + canvas.height + "<br>" +
		"total pixel count: " + (canvas.width * canvas.height);

	// redraw the screen
	draw();
}

let canvasX = 0;
let canvasY = 0;
let r = 0;
let g = 0;
let b = 0;
let rayDirection = new Vector3();
let colorVector = new Vector3(); // x = r, y = g, z = b


function draw()
{
	// loop over all pixels on screen
	for (let row = 0; row < canvas.height; row++)
	{
		for (let column = 0; column < canvas.width; column++)
		{
			canvasX = column / (canvas.width - 1);
			canvasY = row / (canvas.height - 1);
			// flip Y coordinates so 0 is bottom of screen and 1 is top of screen
			canvasY = 1 - canvasY;
			// canvasX goes from 0.0 to 1.0
			// canvasY goes from 0.0 to 1.0

			canvasX *= 2; // canvasX goes from 0 to 2
			canvasY *= 2; // canvasY goes from 0 to 2
			canvasX -= 1;
			canvasY -= 1;
			// canvasX now goes from -1.0 to +1.0 (left to right)
			// canvasY now goes from -1.0 to +1.0 (bottom to top)

			// if (row == 0)
			// {
			// 	console.log("canvasX is " + canvasX);
			// }

			rayDirection.set(canvasX, canvasY, -0.1);
			rayDirection.normalize();
			colorVector.copy(rayDirection);
			colorVector.absolute();
			colorVector.multiplyScalar(255);
			colorVector.floor();

			//"rgb(r,g,b)"
			context.fillStyle = "rgb(" + colorVector.x + "," + colorVector.y + "," + colorVector.z + ")";
			context.fillRect(column, row, 1, 1);
		}
		///console.log("canvasY is " + canvasY);
	}
} // end function draw()

// jumpstart the drawing of the screen
handleWindowResize();
