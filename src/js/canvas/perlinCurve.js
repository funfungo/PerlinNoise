//perlinCurve
(function () {
    var canvas = document.getElementById("perlinCurveCanvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222";
    var width = canvas.width = canvas.parentElement.clientWidth - 80;
    var height = canvas.height = canvas.parentElement.clientHeight - 80;

    var lastPosition = null;

    var offset = 0;
    
    window.initPerlin = function (tag) {
        if(animation !== null){
            cancelAnimationFrame(animation);
        }
        width = canvas.width = canvas.parentElement.clientWidth - 80;
        height = canvas.height = canvas.parentElement.clientHeight - 80;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        noise.seed(Math.random());
        lastPosition = null;
        ctx.clearRect(-width/2, -height/2, width, height);
        
        if(tag === "perlinCurve"){
            ctx.translate(width / 2, height / 2) ;
            ctx.clearRect(-width/2, -height/2, width, height);

            ctx.beginPath();
            for (var i = 0; i < width; i++) {

                var noiseVal = noise.simplex2(1, i / 100 + offset);
                var y = util.map(noiseVal, -1, 1, -height / 2, height / 2);
                if(lastPosition === null){
                    lastPosition = y;
                }
                ctx.moveTo(i - width / 2, lastPosition);
                ctx.lineTo(i - width / 2, y);
                lastPosition = y;
            }
            ctx.stroke();
        }
        
        else if(tag === "randomWave"){
            ctx.translate(width / 2, height / 2) ;
            ctx.beginPath();
            for (var i = 0; i < width; i++) {

                var y = util.map(Math.random()-0.5, -0.5, 0.5, -height / 2, height / 2);
                if(lastPosition === null){
                    lastPosition = y;
                }
                ctx.moveTo(i - width / 2, lastPosition);
                ctx.lineTo(i - width / 2, y);
                lastPosition = y;
            }
            ctx.stroke();
        }
        
        else if(tag === "2d"){
            var image = ctx.createImageData(canvas.width, canvas.height);
            var data = image.data;
            var max = -Infinity, min = Infinity;

            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var value = noise.perlin3(x / 50, y / 50, height);

                    if (max < value) max = value;
                    if (min > value) min = value;

                    value = (1 + value) * 1.1 * 128;

                    var cell = (x + y * width) * 4;
                    data[cell] = data[cell + 1] = data[cell + 2] = value;
                    data[cell + 3] = 255; // alpha.
                }
            }

            ctx.putImageData(image, 0, 0);
        }
    };
    window.initPerlinCurve = function () {
        if(animation !== null){
            cancelAnimationFrame(animation);
        }
        width = canvas.width = canvas.parentElement.clientWidth - 80;
        height = canvas.height = canvas.parentElement.clientHeight - 80;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.translate(width / 2, height / 2) ;
        noise.seed(Math.random());
        lastPosition = null;
        ctx.clearRect(-width/2, -height/2, width, height);

        ctx.beginPath();
        for (var i = 0; i < width; i++) {

            var noiseVal = noise.simplex2(1, i / 100 + offset);
            var y = util.map(noiseVal, -1, 1, -height / 2, height / 2);
            if(lastPosition === null){
                lastPosition = y;
            }
            ctx.moveTo(i - width / 2, lastPosition);
            ctx.lineTo(i - width / 2, y);
            lastPosition = y;
        }
        ctx.stroke();

        lastPosition = 0;
    };

    window.initRandomCurve = function () {
        if(animation !== null){
            cancelAnimationFrame(animation);
        }
        lastPosition = null;
        ctx.clearRect(-width/2, -height/2, width, height);
        ctx.beginPath();
        for (var i = 0; i < width; i++) {

            var y = util.map(Math.random()-0.5, -0.5, 0.5, -height / 2, height / 2);
            if(lastPosition === null){
                lastPosition = y;
            }
            ctx.moveTo(i - width / 2, lastPosition);
            ctx.lineTo(i - width / 2, y);
            lastPosition = y;
        }
        ctx.stroke();
    };

    window.init2dPerlin = function () {
        if(animation !== null){
            cancelAnimationFrame(animation);
        }
        noise.seed(Math.random());
        ctx.clearRect(-width/2, -height/2, width, height);
        var image = ctx.createImageData(canvas.width, canvas.height);
        var data = image.data;
        var max = -Infinity, min = Infinity;

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var value = noise.perlin3(x / 50, y / 50, height);

                if (max < value) max = value;
                if (min > value) min = value;

                value = (1 + value) * 1.1 * 128;

                var cell = (x + y * width) * 4;
                data[cell] = data[cell + 1] = data[cell + 2] = value;
                data[cell + 3] = 255; // alpha.
            }
        }

        ctx.putImageData(image, 0, 0);
    }

})();
