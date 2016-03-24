(function () {

    var ctx,
        width,
        height,
        radius = 15,
        angle = Math.PI / 3,
        hexWidth = (radius + Math.cos(angle) * radius)
                 - (Math.cos(Math.PI + angle) * radius),
        hexHeight = Math.sin(angle) * radius * 2,
        xInvDiag = Math.cos(Math.PI + angle) * radius,
        yInvDiag = Math.sin(Math.PI + angle) * radius,
        xDiag = Math.cos(angle) * radius,
        yDiag = Math.sin(angle) * radius,
        oddX,
        xSpacing,
        ySpacing,
        xHexes,
        yHexes,
        colors = [
            "#CC2222",
            "#22CC22",
            "#2222CC",
            "#CCCC22"
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
        oddX = xSpacing / 2;
    }

    function drawHex(x, y, color) {
        var offsetX = y % 2 === 0 ? oddX : 0,
            startX = offsetX + x * xSpacing + xInvDiag,
            startY = y * ySpacing + yInvDiag;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + radius, startY);
        ctx.lineTo(startX + radius + xDiag, startY + yDiag);
        ctx.lineTo(startX + radius, startY + hexHeight);
        ctx.lineTo(startX, startY + hexHeight);
        ctx.lineTo(startX + xInvDiag, startY + yDiag);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    }

    function drawColoredHexes() {
        var x, y,
            color;
        for (y = 0; y < yHexes; y++) {
            for (x = 0; x < xHexes; x++) {
                color = colors[Math.floor(Math.random() * 4)];
                drawHex(x, y, color);
            }
        }
    }

    function run() {
        init();

        drawColoredHexes();
    }

    document.addEventListener("DOMContentLoaded", run);
    document.addEventListener("click", drawColoredHexes);

}());