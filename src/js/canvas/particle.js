function Particle(p) {
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.maxspeed = 4;
    this.h = 0;

    this.prevPos = this.pos.copy();

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };

    this.follow = function(vectors) {
        var x = p.floor(this.pos.x / 20);
        var y = p.floor(this.pos.y / 20);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    };

    this.applyForce = function(force) {
        this.acc.add(force);
    };

    this.showDot = function () {
        p.stroke(0);
        p.strokeWeight(4);
        p.point(this.pos.x, this.pos.y);
    };
    this.showLine = function() {
        // p.stroke(this.h, 255, 255, 25);
        this.h = this.h + 1;
        if (this.h > 255) {
            this.h = 0;
        }
        p.strokeWeight(1);
        p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    };

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    };

    this.edges = function() {
        if (this.pos.x > p.width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = p.width;
            this.updatePrev();
        }
        if (this.pos.y > p.height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = p.height;
            this.updatePrev();
        }

    }

}
