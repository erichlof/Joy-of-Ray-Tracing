function Vector3(x = 0, y = 0, z = 0)
{
	this.x = x;
	this.y = y;
	this.z = z;
	return this;
}

Vector3.prototype.set = function(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
	return this;
};

Vector3.prototype.copy = function(otherVector)
{
	this.x = otherVector.x;
	this.y = otherVector.y;
	this.z = otherVector.z;
	return this;
};

Vector3.prototype.add = function(otherVector)
{
	this.x += otherVector.x;
	this.y += otherVector.y;
	this.z += otherVector.z;
	return this;
};

Vector3.prototype.subtract = function(otherVector)
{
	this.x -= otherVector.x;
	this.y -= otherVector.y;
	this.z -= otherVector.z;
	return this;
};

Vector3.prototype.multiplyScalar = function(scalarNumber)
{
	this.x *= scalarNumber;
	this.y *= scalarNumber;
	this.z *= scalarNumber;
	return this;
};

Vector3.prototype.floor = function()
{
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
	this.z = Math.floor(this.z);
	return this;
};

Vector3.prototype.absolute = function()
{
	this.x = Math.abs(this.x);
	this.y = Math.abs(this.y);
	this.z = Math.abs(this.z);
	return this;
};

Vector3.prototype.vectorLength = function()
{
	return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
};

let inverseLength = 0;
Vector3.prototype.normalize = function()
{
	inverseLength = 1 / this.vectorLength();
	this.x *= inverseLength;
	this.y *= inverseLength;
	this.z *= inverseLength;
	return this;
};

Vector3.prototype.dot = function(otherVector)
{
	return (this.x * otherVector.x) + (this.y * otherVector.y) + (this.z * otherVector.z);
};

Vector3.prototype.mix = function(vectorA, vectorB, t)
{
	t = Math.min(t, 1);
	t = Math.max(t, 0);
	this.x = vectorA.x + (vectorB.x - vectorA.x) * t;
	this.y = vectorA.y + (vectorB.y - vectorA.y) * t;
	this.z = vectorA.z + (vectorB.z - vectorA.z) * t;
	return this;
};


let planeO_rayO_vec = new Vector3();
let rayD_dot_planeN = 0;
let result = 0;

function intersectPlane(planeOrigin, planeNormal, rayOrigin, rayDirection)
{
	rayD_dot_planeN = rayDirection.dot(planeNormal);
	if (rayD_dot_planeN >= 0)
	{
		return Infinity;
	}

	planeO_rayO_vec.copy(planeOrigin);
	planeO_rayO_vec.subtract(rayOrigin);
	result = planeO_rayO_vec.dot(planeNormal) / rayD_dot_planeN;
	if (result > 0)
	{
		return result;
	}
	
	return Infinity;
}

let t0 = 0;
let t1 = 0;
let discriminant = 0;
let oneOver_2a = 0;

function solveQuadratic(a, b, c)
{
	discriminant = (b * b) - (4 * a * c);
	if (discriminant < 0)
	{
		return false;
	}
	discriminant = Math.sqrt(discriminant);
	oneOver_2a = 1 / (2 * a);
	t0 = (-b - discriminant) * oneOver_2a;
	t1 = (-b + discriminant) * oneOver_2a;
	return true;
}

let L = new Vector3();
// note: in the video for a, b, and c below, I put them all on one line, such as
// let a, b, c = 0;  However, this does not initialize all three to 0 as I had thought.
let a = 0;
let b = 0;
let c = 0;

function intersectSphere(spherePosition, sphereRadius, rayOrigin, rayDirection)
{
	L.copy(rayOrigin);
	L.subtract(spherePosition);
	a = rayDirection.dot(rayDirection);
	b = 2 * L.dot(rayDirection);
	c = L.dot(L) - (sphereRadius * sphereRadius);
	if (solveQuadratic(a, b, c) == false)
	{
		return Infinity;
	}
	if (t0 > 0)
	{
		return t0;
	}
	else if (t1 > 0)
	{
		return t1;
	}
	return Infinity;	
}