function initPageCanvas2() {
    var canvas = document.getElementsByTagName('canvas')[0],
        ctx    = canvas.getContext('2d')

    var dots = [],
        dot  = function() {
            this.x = Math.floor(Math.random()*canvas.width)
            this.y = Math.floor(Math.random()*canvas.height)
            this.r = 1

            this.vx = Math.random()*1 +1
            this.vy = Math.random()*1 +1
        }

    dot.prototype.update = function() {
        if (this.x + this.r >= canvas.width)
            this.vx *= -1
        if (this.x + this.r <= 0)
            this.vx *= -1
        if (this.y + this.r >= canvas.height)
            this.vy *=-1
        if(this.y + this.r <= 0)
            this.vy *=-1

        this.x += this.vx
        this.y += this.vy


        for(var i=0; i<dots.length; i++) {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(dots[i].x, dots[i].y)
            ctx.closePath()
            ctx.strokeStyle = '#205E88'
            ctx.stroke()
            ctx.globalAlpha = 0.2
        }

    }

    var create = function(x) {
        for(var i=0; i<x; i++) {
            d = new dot()

            dots.push(d)
        }
    }

    var loop = function() {
        ctx.clearRect(0,0,canvas.width, canvas.height)
        for(var i=0; i<dots.length; i++) {
            dots[i].update()
        }
    }

    create(7)

    setInterval(loop, 5)


}

