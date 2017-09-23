function random(max) {
    return Math.random() * max;
}

function randomInt(max) {
    return   Math.round(Math.random() * max);
}


function randomMin(min, max) {
    var  rango = max -min;
    
    return Math.round((Math.random() * rango) + min);
}

function randomMinFloat(min, max) {
    var  rango = max -min;
    
    return Math.random() * rango + min;
}


function randomColorBN(min) {
     
    var a = Math.round(randomMin(min,127));
    
    return "rgba(" + a + "," + a + "," + a + ",0.5)";
}

