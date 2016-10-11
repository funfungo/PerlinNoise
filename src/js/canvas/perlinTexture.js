/**
 * Created by nikkifang on 16/10/10.
 */

(function () {
    
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
    
    
    window.p5Demo1 = function (p) {
        var t;
        p.setup = function () {
            p.createCanvas(400, 500);
            p.stroke(0, 18);
            p.noFill();
            t = 0;
        };
        p.draw = function () {
            var x1 = p.width * p.noise(t + 15);
            var x2 = p.width * p.noise(t + 25);
            var x3 = p.width * p.noise(t + 35);
            var x4 = p.width * p.noise(t + 45);
            var y1 = p.height * p.noise(t + 55);
            var y2 = p.height * p.noise(t + 65);
            var y3 = p.height * p.noise(t + 75);
            var y4 = p.height * p.noise(t + 85);

            p.bezier(x1, y1, x2, y2, x3, y3, x4, y4);

            t += 0.005;

            // clear the background every 500 frames using mod (%) operator
            if (p.frameCount % 600 == 0) {
                p.clear();
            }
        }
    };

    window.p5ParticleMove = function (p) {
        var inc = 0.1;
        var scl = 10;
        var cols, rows;

        var zoff = 0;

        var particles = [];

        var flowfield;

        p.setup = function (){
            p.createCanvas(400, 400);
            p.colorMode(p.HSB, 255);
            cols = p.floor(p.width / scl);
            rows = p.floor(p.height / scl);

            flowfield = new Array(cols * rows);

            for (var i = 0; i < 300; i++) {
                particles[i] = new Particle(p);
            }
            // p.background(51);
        };

        p.draw = function (){
            var yoff = 0;
            for (var y = 0; y < rows; y++) {
                var xoff = 0;
                for (var x = 0; x < cols; x++) {
                    var index = x + y * cols;
                    var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
                    var v = p5.Vector.fromAngle(angle);
                    v.setMag(1);
                    flowfield[index] = v;
                    xoff += inc;
                    p.stroke(0, 50);
                    // push();
                    // translate(x * scl, y * scl);
                    // rotate(v.heading());
                    // strokeWeight(1);
                    // line(0, 0, scl, 0);
                    // pop();
                }
                yoff += inc;

                zoff += 0.0003;
            }

            for (var i = 0; i < particles.length; i++) {
                particles[i].follow(flowfield);
                particles[i].update();
                particles[i].edges();
                particles[i].show();
            }

        }
    };

    window.p5Demo2 = function (p) {
        var t;

        p.setup = function(){
            p.createCanvas(400, 500);
            p.stroke(0, 15);
            p.noFill();
            t = 0;
        };

        p.draw = function (){
            p.translate(p.width/2, p.height/2);
            p.beginShape();
            for (var i = 0; i < 200; i++) {
                var ang = p.map(i, 0, 200, 0, p.TWO_PI);
                var rad = 200 * p.noise(i * 0.01, t * 0.005);
                var x = rad * p.cos(ang);
                var y = rad * p.sin(ang);
                p.curveVertex(x, y);
            }
            p.endShape(p.CLOSE);

            t += 1;

            // clear the background every 600 frames using mod (%) operator
            if (p.frameCount % 600 == 0) {
                p.translate(-p.width/2, -p.height/2);
                p.clear();
            }

        }
    }
})();

