let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let halfCanvasW = canvas.width / 2;
let halfCanvasH = canvas.height / 2;

let rectW = 40;
let rectH = 20;

let halfRectW = rectW / 2;
let halfRectH = rectH / 2;

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