/**
 * Created by nikkifang on 16/10/11.
 */

var animation = null, p5Animation = null;
var noise;
var canvasPerlinWave = document.getElementById("perlinWaveCanvas");
var canvasPerlinCurve = document.getElementById("perlinCurveCanvas");
var canvasGrayBox, canvasVector, canvasVectorMove,canvasPerlinDemo;

var inc = 0.1;
var scl = 20;
var cols, rows;

function changePage(index) {
    var tag = $(".index a").eq(index-1).attr("data-tag");
    $(".page").hide();
    $(".page").removeClass("active");
    $(".page" + index).show();
    $(".page" + index).addClass("active");
    $(".index a").removeClass("active");
    $(".index a").eq(index - 1).addClass("active");
    if(tag === "perlinCurve"){
        initPerlinCurve();
    }
    else if(tag === "perlinWave"){
        initPerlinWave();
    }
    else if(tag === "perlinDemo"){
        if(canvasPerlinDemo == undefined){
            canvasPerlinDemo = new p5(p5Demo1,"perlinDemo");
            new p5(p5Demo2,"perlinDemo");
        }
    }
    else if(tag === "randomDemo"){
        initPageCanvas2();
    }
}

function removeP5Animation() {
    if(p5Animation !== null){
        p5Animation.remove();
    }
}

hljs.initHighlightingOnLoad();
$(document).ready(function () {
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
});

//    事件
$(".content__change a").on("click", function () {
    var id = $(this).attr("id");
    if(id == undefined){

        $(".content__change a").removeClass("active");
        $(this).addClass("active");
        var index = $(this).parent().children().index($(this));
        $(".active .step").hide();
        $(".active .step" + index).show();
    }
    else if(id == "perlinCurve"){
        initPerlin("perlinCurve");
        $(".page6__index").show();
    }
    else if(id == "randomCurve"){
        initPerlin("randomWave");
        $(".page6__index").hide();
    }
    else if(id == "wave"){
        initPerlinWave(canvasPerlinCurve);
    }
    else if(id === "perlin2D"){
        initPerlin("2d");
    }
    else if(id == "grayScale"){
        removeP5Animation();
        p5Animation = new p5(p5GrayBox, "perlinTexture");
    }
    else if(id == "vector"){
        removeP5Animation();
        p5Animation = new p5(p5Vector, "perlinTexture");

    }
    else if(id == "vectorMove"){
        removeP5Animation();
        p5Animation = new p5(p5VectorMove, "perlinTexture");
    }
    else if(id == "particle"){
        removeP5Animation();
        p5Animation = new p5(p5Particle, "perlinTexture");
    }
    else if(id == "particleMove"){
        removeP5Animation();
        p5Animation = new p5(p5ParticleMove, "perlinTexture");
    }
    else if(id == "lineMove"){
        removeP5Animation();
        p5Animation = new p5(p5LineMove, "perlinTexture");
    }

});

$(".index a").on("click", function () {
    var index = $(this).parent().children().index($(this)) + 1;
    changePage(index);
});



changePage(1);
