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