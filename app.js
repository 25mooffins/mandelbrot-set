/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class point{
    x;
    y;
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    square(){
        var x = this.x;
        var y = this.y;
        // real portion is a^2 - b^2, imaginary portion is 2abi
        return new point((x**2 - y**2), (2 * x * y));
    }
    modulus(){
        var x = this.x;
        var y = this.y;
        return new point(Math.sqrt(x**2 + y**2));
    }
}

//mandelbrot set has to be in rect size 2:3
var calculatedHeight = window.innerHeight*6/7;
var calculatedWidth = calculatedHeight*3/2
var topLeft = new point((window.innerWidth-calculatedWidth)/2,(window.innerHeight-calculatedHeight)/2);
var bottomRight = new point(topLeft.x + calculatedWidth, topLeft.y + calculatedHeight);

//how many coordinate increments per pixel
var increments = 2/calculatedHeight; //or 3/calculatedWidth
const MAX_ITERATIONS = 60;
var pixelIncrements = 1;

//draw rect
ctx.beginPath();
ctx.rect(topLeft.x, topLeft.y, calculatedWidth, calculatedHeight);
ctx.lineWidth = 1;
ctx.strokeStyle = "white";
ctx.stroke();

console.log(calculatedWidth);
console.log(calculatedHeight);
console.log(topLeft.x);
// console.log(mandelbrot(0,1))
// console.log(new point(-1,-1).square().y)


// // for each pixel
for(let x = topLeft.x; x <= bottomRight.x; x+= pixelIncrements){
    var coordX = (x-topLeft.x) * increments-2;
    for(let y = topLeft.y; y <= bottomRight.y; y+= pixelIncrements){
        var coordY = (y - topLeft.y) * increments-1;
        var output = mandelbrot(coordX, coordY);
        if(output == -1){
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, pixelIncrements, pixelIncrements);
            ctx.stroke();

        }
        else{
            ctx.beginPath();
            var percentage = output/MAX_ITERATIONS
            ctx.fillStyle = "rgb(" + 0 + "," + (percentage*255) + "," + (percentage * 255) + ")";

            ctx.fillRect(x, y, pixelIncrements, pixelIncrements);
            ctx.stroke();
        }
    }   
}

// z(n+1) = z(n)^2 + c
function mandelbrot(x, y){
    var z = new point(0,0);
    var p = new point(x, y);
    if(z.modulus>2){
        return 0;
    }
    for(let i = 0; i < MAX_ITERATIONS; i++){
        var square = z.square();
        z.x = square.x + x;
        z.y = square.y + y; 
        // console.log(z);
        // console.log(z.modulus());
        if(z.modulus().x>4){
            return i+1;
        }
    }
    return -1;
}