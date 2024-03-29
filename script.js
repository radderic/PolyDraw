var drawCanvas = document.getElementById("draw-canvas");
var xCanvas = document.getElementById("x-canvas");
var yCanvas = document.getElementById("y-canvas");

var dctx = drawCanvas.getContext("2d");
var xctx = xCanvas.getContext("2d");
var yctx = yCanvas.getContext("2d");

var startTime = new Date().getTime();

let setup = () => {
    dctx.fillStyle = "#000000";
    dctx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
    xctx.fillStyle = "#000000";
    xctx.fillRect(0, 0, xCanvas.width, xCanvas.height);
    yctx.fillStyle = "#000000";
    yctx.fillRect(0, 0, yCanvas.width, yCanvas.height);

    dctx.strokeStyle = '#ffffff';
    dctx.moveTo(0, drawCanvas.height/2);
    dctx.lineTo(drawCanvas.width, drawCanvas.height/2);
    dctx.stroke();
    dctx.moveTo(100, 0);
    dctx.lineTo(100, drawCanvas.height);
    dctx.stroke();

    xctx.strokeStyle = '#ffffff';
    xctx.moveTo(0, xCanvas.height/2);
    xctx.lineTo(xCanvas.width, xCanvas.height/2);
    xctx.stroke();
    xctx.moveTo(100, 0);
    xctx.lineTo(100, xCanvas.height);
    xctx.stroke();

    yctx.strokeStyle = '#ffffff';
    yctx.moveTo(0, yCanvas.height-100);
    yctx.lineTo(yCanvas.width, yCanvas.height-100);
    yctx.stroke();
    yctx.moveTo(100, 0);
    yctx.lineTo(100, yCanvas.height);
    yctx.stroke();

    let ratio = 100;
    for(let i = 2; i*ratio < drawCanvas.width; i++) {
        dctx.moveTo(i*ratio, (drawCanvas.height/2) - 20);
        dctx.lineTo(i*ratio, (drawCanvas.height/2) + 20);
        dctx.stroke();

        xctx.moveTo(i*ratio, (xCanvas.height/2) - 20);
        xctx.lineTo(i*ratio, (xCanvas.height/2) + 20);
        xctx.stroke();

        yctx.moveTo(i*ratio, yCanvas.height - 100 - 20);
        yctx.lineTo(i*ratio, yCanvas.height - 100 + 20);
        yctx.stroke();

    }

    for(let i = 1; i*ratio < drawCanvas.height; i++) {
        dctx.moveTo(ratio-20, (i*ratio));
        dctx.lineTo(ratio+20, (i*ratio));
        dctx.stroke();

        xctx.moveTo(ratio-20, (i*ratio));
        xctx.lineTo(ratio+20, (i*ratio));
        xctx.stroke();

        yctx.moveTo(ratio-20, (i*ratio));
        yctx.lineTo(ratio+20, (i*ratio));
        yctx.stroke();
    }


    for(let i = 1; i*ratio < yCanvas.height; i++) {
        yctx.moveTo(ratio-20, (i*ratio));
        yctx.lineTo(ratio+20, (i*ratio));
        yctx.stroke();
    }
}

setup();

function getMousePos(drawCanvas, evt) {
    var rect = drawCanvas.getBoundingClientRect();
    //console.log(evt.clientX - rect.left, evt.clientY - rect.top);
    let coords = document.getElementById("coords");
    let x = (evt.clientX - rect.left - 100) / 100;
    let y = ((evt.clientY - rect.top - drawCanvas.height/2 ) * -1)/100;
    coords.innerHTML = `x:${x} y:${y}`;
}

let translate = (x) => {
    return drawCanvas.width - x;
}

let getTime = () => {
    let time = new Date().getTime();
    return time - startTime;
}

let prevx = 0;
let prevy = 0;

let drawPoint = (ctx, x, y, color) => {
    let rectsize = 10;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, rectsize, rectsize);
    //console.log(`point at: x:${x} y:${y}`);
}

let stroke = (ctx, x, y, color) => {
    ctx.strokeStyle = '#ffffff';
    ctx.moveTo(prevx, prevy);
    ctx.lineTo(x, y);
    ctx.stroke();
}

drawCanvas.addEventListener('mousedown', (evt) => {
    var rect = drawCanvas.getBoundingClientRect();
    //let x = (evt.clientX - rect.left - 100) / 100;
    //let y = (evt.clientY - rect.top - drawCanvas.height/2 ) * -1;
    let xoff = 8;
    let yoff = 8;
    let x = evt.clientX - rect.left - xoff;
    let y = evt.clientY - rect.top - yoff;

    let t = getTime();
    drawPoint(dctx, x, y, "#ff0000");
    stroke(dctx, x, y, "#ffff00");
    t = (t/30 % 700)+100;
    drawPoint(xctx, t, y, "#00ff00");
    drawPoint(yctx, t, translate(x), "#0000ff");
    prevx = x;
    prevy = y;
});

drawCanvas.addEventListener('mousemove', function(evt) {
    getMousePos(drawCanvas, evt);
});

