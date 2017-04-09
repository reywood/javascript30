const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#bada55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 1;
// ctx.globalCompositeOperation = 'destination-over';

let isDrawing = false;
let lastX = null;
let lastY = null;
let hue = 0;

const UP = true;
const DOWN = false;
let lineWidthDirection = UP;

function startDrawing(e) {
    [lastX, lastY] = [e.offsetX, e.offsetY];
    ctx.lineWidth = 1;
    isDrawing = true;
}

function draw(e) {
    if (!isDrawing) {
        return;
    }
    // console.log(e);

    setLineHue();
    setLineWidth();
    drawLine(e.offsetX, e.offsetY)
}

function stopDrawing(e) {
    isDrawing = false;
}

function setLineHue() {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    hue = (hue + 1) % 360;
}

function setLineWidth() {
    if (lineWidthDirection === UP) {
        ctx.lineWidth += .3;
    } else {
        ctx.lineWidth -= .3;
    }

    if (ctx.lineWidth >= 100) {
        lineWidthDirection = DOWN;
    }
    if (ctx.lineWidth <= 1) {
        lineWidthDirection = UP;
    }
}

function drawLine(toX, toY) {
    if (lastX !== null && lastY !== null) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }
    [lastX, lastY] = [toX, toY];
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
window.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', e => {
    lastX = lastY = null;
});
const compositeOpSelect = document.querySelector('.controls select[name="composite-operation"]');
compositeOpSelect.addEventListener('change', (e) => {
    ctx.globalCompositeOperation = compositeOpSelect.value;
});
