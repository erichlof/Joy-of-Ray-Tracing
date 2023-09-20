let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let aspectRatio = 0;

let userInfo = document.getElementById("userInfo");


window.addEventListener("resize", handleWindowResize);
function handleWindowResize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	aspectRatio = canvas.width / canvas.height;

	userInfo.innerHTML = "canvasW: " + canvas.width + " canvasH: " + canvas.height + "<br>" +
		"total pixel count: " + (canvas.width * canvas.height);

	// redraw the screen
	draw();
}

let canvasX = 0;
let canvasY = 0;

let rayOrigin = new Vector3(0, 0, 0);
let rayDirection = new Vector3();
let colorVector = new Vector3(); // x = r, y = g, z = b

let skyColor = new Vector3(0.2, 0.6, 1.0);
let groundColor = new Vector3(0.5, 0.5, 0.5);
let fogColor = new Vector3(0.7, 0.7, 0.7);
let gradientSkyColor = new Vector3();

let planeOrigin = new Vector3(0, -3, 0);
let planeNormal = new Vector3(0, 1, 0);
planeNormal.normalize();

let sphereRadius = 3;
let spherePosition = new Vector3(0, planeOrigin.y + sphereRadius, -10);
let sphereColor = new Vector3(0.8, 0.01, 0.01);

let t = 0;
let nearestT = 0;

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

			canvasX *= aspectRatio;
			// if (row == 0)
			// {
			// 	console.log("canvasX is " + canvasX);
			// }

			rayDirection.set(canvasX, canvasY, -1);
			rayDirection.normalize();

			gradientSkyColor.mix(fogColor, skyColor, rayDirection.y * 1.5);

			// Important: must reset nearestT for each pixel!
			nearestT = Infinity;

			t = intersectSphere(spherePosition, sphereRadius, rayOrigin, rayDirection);
			if (t < nearestT)
			{
				nearestT = t;
				colorVector.copy(sphereColor);
			}

			t = intersectPlane(planeOrigin, planeNormal, rayOrigin, rayDirection);
			if (t < nearestT)
			{
				nearestT = t;
				colorVector.mix(groundColor, gradientSkyColor, t * 0.008);
			}

			if (nearestT == Infinity)
			{
				colorVector.copy(gradientSkyColor);
			}
			
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
