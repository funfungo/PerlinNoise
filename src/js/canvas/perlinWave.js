
//perlinWave;
(function () {
    var canvas = document.getElementById("perlinWaveCanvas");
    var ctx = canvas.getContext("2d");

    var width = canvas.width = canvas.parentElement.clientWidth - 80;
    var height = canvas.height = canvas.parentElement.clientHeight - 80;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    var lastPosition = null;

    var offset = 0;
    var xOffset = 0;
    var yOffset = 0;
    function perlinWaveloop() {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 1;
        ctx.translate(width / 2, height / 2);
        lastPosition = null;
        ctx.clearRect(-width/2, -height/2, width, height);
//            ctx.strokeStyle = "#999";

        ctx.beginPath();
        for (var i = 0; i < width; i++) {

            var noiseVal = noise.simplex2(3+xOffset, i / 300 + yOffset);
            var y = util.map(noiseVal, -1, 1, -70, 70);
            if(lastPosition === null){
                lastPosition = y;
            }
            ctx.moveTo(i - width / 2, lastPosition);
            ctx.lineTo(i - width / 2, y);
            lastPosition = y;
        }
        ctx.stroke();
        xOffset += 2/200;
        yOffset += 2/100;
        animation = requestAnimationFrame(perlinWaveloop);
    }
    window.initPerlinWave = function (target) {
        if(target !== undefined){
            canvas = target;
            ctx = target.getContext("2d");
        }
        lastPosition = null;
        xOffset = 0;
        yOffset = 0;
        if(animation !== null){
            cancelAnimationFrame(animation);
        }
        perlinWaveloop();
    }
})();
