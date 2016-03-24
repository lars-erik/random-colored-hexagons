(function () {

    var ctx,
        width,
        height,
        radius = 20,
        angle = Math.PI / 3,
        hexWidth = (radius + Math.cos(angle) * radius)
                 - (Math.cos(Math.PI + angle) * radius),
        hexHeight = Math.sin(angle) * radius * 2,
        xSpacing,
        ySpacing,
        xHexes,
        yHexes,
        colors = [
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00"
        ];
    ;

    function init() {
        var canvas = document.getElementById("canvas");
        width = canvas.width = document.body.clientWidth;
        height = canvas.height = document.body.clientHeight;
        ctx = canvas.getContext("2d");
        xSpacing = hexWidth + radius;
        ySpacing = hexHeight / 2;
        xHexes = width / xSpacing + 1;
        yHexes = height / ySpacing + 1;
    }

    function drawHex(x, y) {
        var startX = x + Math.cos(Math.PI + angle) * radius,
            startY = y + Math.sin(Math.PI + angle) * radius,
            color = colors[Math.floor(Math.random()*4)];
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + radius, startY);
        ctx.lineTo(startX + radius + Math.cos(angle) * radius, startY + Math.sin(angle) * radius);
        ctx.lineTo(startX + radius, startY + Math.sin(angle) * radius * 2);
        ctx.lineTo(startX, startY + Math.sin(angle) * radius * 2);
        ctx.lineTo(startX + Math.cos(Math.PI + angle) * radius, startY + Math.sin(angle) * radius);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    }

    function drawHexes() {
        var x, y, offsetX;
        for (y = 0; y < yHexes; y++) {
            offsetX = y % 2 === 0 ? xSpacing / 2 : 0;
            for (x = 0; x < xHexes; x++) {
                drawHex(x * xSpacing + offsetX, y * ySpacing);
            }
        }
    }

    function run() {
        init();

        drawHexes();
    }

    document.addEventListener("DOMContentLoaded", run);

}());