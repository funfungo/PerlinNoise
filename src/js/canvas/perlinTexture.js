/**
 * Created by nikkifang on 16/10/10.
 */

(function () {
    window.p5ChangeSeed = function () {
        p5.noiseSeed(99);
    };
    window.p5GrayBox = function (p) {
        var inc = 0.1;
        var scl = 20;
        var x = 100;
        var y = 100;
        var width = 500;
        var height = 400;

        p.setup = function() {
            p.createCanvas(500, 400);
            cols = p.floor(width / scl);
            rows = p.floor(height / scl);
        };

        p.draw = function() {

            var yoff = 0;
            for(var y = 0; y < rows; y++){
                var xoff = 0;
                for(var x = 0; x < cols; x++){
                    var index = (x + y * width) * 4;
                    var r = p.noise(xoff, yoff) * 255;
                    xoff += inc;
                    p.fill(r);
                    p.rect(x * scl, y * scl, scl, scl);
                }
                yoff += inc;
            }
        };
        p.noLoop();
    };

    window.p5Vector = function( p ) {
        var inc = 0.1;
        var scl = 20;
        var x = 100;
        var y = 100;
        var width = 500;
        var height = 400;

        p.setup = function() {
            p.createCanvas(500, 400);
            cols = p.floor(width / scl);
            rows = p.floor(height / scl);
        };

        p.draw = function() {

            var yoff = 0;
            for(var y = 0; y < rows; y++){
                var xoff = 0;
                for(var x = 0; x < cols; x++){
                    var index = (x + y * width) * 4;
                    var angle = p.noise(xoff, yoff) * p.TWO_PI;
                    var v = p5.Vector.fromAngle(angle);
                    xoff += inc;
                    p.stroke(0);
                    p.push();
                    p.translate(x*scl, y* scl);
                    p.rotate(v.heading());
                    p.line(0,0,scl,0);
                    p.pop();
//                    p.fill(r);
//                    p.rect(x * scl, y * scl, scl, scl);
                }
                yoff += inc;
            }
        };

        p.noLoop();
    };

    window.p5VectorMove= function( p ) {
        var inc = 0.1;
        var scl = 20;
        var x = 100;
        var y = 100;
        var width = 500;
        var height = 400;
        var zoff = 0;

        p.setup = function() {
            p.createCanvas(500, 400);
            cols = p.floor(width / scl);
            rows = p.floor(height / scl);
        };

        p.draw = function() {

            p.clear();
            var yoff = 0;
            for(var y = 0; y < rows; y++){
                var xoff = 0;
                for(var x = 0; x < cols; x++){
                    var index = (x + y * width) * 4;
                    var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
                    var v = p5.Vector.fromAngle(angle);
                    xoff += inc;
                    p.stroke(0);
                    p.push();
                    p.translate(x*scl, y* scl);
                    p.rotate(v.heading());
                    p.line(0,0,scl,0);
                    p.pop();
//                    p.fill(r);
//                    p.rect(x * scl, y * scl, scl, scl);
                }
                yoff += inc;
            }
            zoff += 0.01;
        };
    };

})();
