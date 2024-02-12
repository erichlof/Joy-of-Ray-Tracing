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
let pixelColor = new Vector3(); // x = r, y = g, z = b

let skyColor = new Vector3(0.2, 0.6, 1.0);
let groundColor = new Vector3(0.4, 0.4, 0.4);
let fogColor = new Vector3(0.7, 0.7, 0.7);
let gradientSkyColor = new Vector3();

let planeOrigin = new Vector3(0, -3, 0);
let planeNormal = new Vector3(0, 1, 0);
planeNormal.normalize();

let sphereRadius = 3;
let spherePosition = new Vector3(0, planeOrigin.y + sphereRadius, -15);
let sphereColor = new Vector3(0.8, 0.01, 0.01);

let t = 0;
let nearestT = 0;
let intersectionColor = new Vector3();
let intersectionPoint = new Vector3();
let intersectionNormal = new Vector3();


let directionToLight = new Vector3(1, 1, 1);
directionToLight.normalize();
let sunLightColor = new Vector3(1, 1, 1);

let ambientColor = new Vector3();
let ambientIntensity = 0.4;
let diffuseColor = new Vector3();
let diffuseIntensity = 0;

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
			// canvasX is now in the range of 0.0 to 1.0 (left to right)
			// canvasY is now in the range of 0.0 to 1.0 (bottom to top)

			canvasX *= 2; // canvasX now goes from 0.0 to 2.0 (left to right)
			canvasY *= 2; // canvasY now goes from 0.0 to 2.0 (bottom to top)
			canvasX -= 1; // canvasX now goes from -1.0 to +1.0 (left to right)
			canvasY -= 1; // canvasY now goes from -1.0 to +1.0 (bottom to top)
			
			canvasX *= aspectRatio;

			rayDirection.set(canvasX, canvasY, -1.5);
			rayDirection.normalize();

			gradientSkyColor.mix(fogColor, skyColor, rayDirection.y * 1.5);

			// Important: must reset nearestT for each pixel!
			nearestT = Infinity;
			// Important: must also reset pixelColor to black (no color) for each pixel!
			pixelColor.set(0, 0, 0);

			t = intersectSphere(spherePosition, sphereRadius, rayOrigin, rayDirection);
			if (t < nearestT)
			{
				nearestT = t;
				intersectionPoint.getPointAlongRay(rayOrigin, rayDirection, t);
				intersectionNormal.copy(intersectionPoint);
				intersectionNormal.subtract(spherePosition);
				intersectionColor.copy(sphereColor);
			}

			t = intersectPlane(planeOrigin, planeNormal, rayOrigin, rayDirection);
			if (t < nearestT)
			{
				nearestT = t;
				intersectionNormal.copy(planeNormal);
				intersectionColor.copy(groundColor);
			}

			// if the ray hit anything at all, apply lighting to the intersection (using the recorded intersection data)
			if (nearestT < Infinity)
			{
				intersectionNormal.normalize();

				ambientColor.copy(intersectionColor);
				ambientColor.multiplyScalar(ambientIntensity);

				diffuseColor.copy(intersectionColor);
				diffuseColor.multiplyColor(sunLightColor);
				diffuseIntensity = intersectionNormal.dot(directionToLight);
				diffuseIntensity = Math.max(0, diffuseIntensity);
				diffuseColor.multiplyScalar(diffuseIntensity);

				pixelColor.add(ambientColor);
				pixelColor.add(diffuseColor);

				pixelColor.mix(pixelColor, gradientSkyColor, nearestT * 0.004);
			}

			// if the ray missed everything, set the pixel color to the background color
			if (nearestT == Infinity)
			{
				pixelColor.copy(gradientSkyColor);
			}
			
			pixelColor.multiplyScalar(255);
			pixelColor.floor();

			//"rgb(r,g,b)"
			context.fillStyle = "rgb(" + pixelColor.x + "," + pixelColor.y + "," + pixelColor.z + ")";
			context.fillRect(column, row, 1, 1);
		}
	}
} // end function draw()

// jumpstart the drawing of the screen
handleWindowResize();
