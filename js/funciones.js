
$(document).ready(function() {


//----------------- CLASES

    function Entorno(nombre, img, tamCanvas, x, y, x2, y2, cicloVarImg, cicloVarBasura) {
        //-- ATRIBUTOS
        this.nombre = nombre;
        this.imagen = document.getElementById(img);
        ; // imagen para el canvas
        this.canvas = $("#" + this.nombre);
        this.contexto = this.canvas.get(0).getContext("2d");
        ;


        this.contador = 0;
        this.contaminacion = 10;
        this.cicloVarImg = cicloVarImg;
        this.cicloVarBasura = cicloVarBasura;
        this.cicloImagen = randomInt(this.cicloVarImg) + 1; // un maximo de sesentas ciclos
        this.cicloBasura = randomInt(this.cicloVarBasura) + 1; // ciclo para desprender basura


        this.llena = false; // una vez que se completa el canvas con imagenes
        //this. llena pasa a true

        this.x = x;
        this.x2 = x2;
        this.y = y,
        this.y2 = y2;

        this.tamCanvas = tamCanvas;

        this.cantidadCuadros = Math.floor(tamCanvas / TAM_CUADRO);  // cantidad de cuadros que tiene el canvas

       

        //-- METODOS

        this.contaminar = function() {

            ++this.contaminacion;
        };

        this.gerarBasura = function() {
            var b = new GeneradorBasura();
            var s = b.contaminar(this.contaminacion);
            var id = "" + this.nombre + "" + this.contador;
            

            $('#basura').prepend("  <div class='libre' id=" + id + "><p> " + s + "  </p></div>");
            $('#' + id).css({'color': randomColorBN(20), 'font-size': randomMinFloat(0.001, 0.5625) + 'em', 'width': '20px', 'height': '20px', 'left': randomMin(this.x, this.x2), 'top': randomMin(this.y, this.y2), 'z-index': randomMin(-10,0 )});
      
            return s;
        };

        this.avanzar = function() {

            --this.cicloImagen;
            --this.cicloBasura;
            if (this.cicloImagen < 0) {
                this.cicloImagen = randomInt(this.cicloVarImg) + 1;

            }
            if (this.cicloBasura < 0) {
                this.cicloBasura = randomInt(this.cicloVarBasura) + 1;

            }


        };

        this.estaCompleto = function() {
            if (this.contador == this.cantidadCuadros) {
                this.llena = true;
            }
            return this.llena;
        };


        this.mouseSobreCanvas = function() {
            // console.log("hola");

            var nombre = this.nombre;
           $("#" + nombre).mouseenter( this.contaminar(nombre));
//           
        };


        this.dibujar = function() {
            if (this.cicloImagen == 0) {

                if (this.llena) {
                    // console.log("completo : " + this.estaCompleto());
                    this.contexto.drawImage(this.imagen, random(this.imagen.width - TAM_CUADRO), random(this.imagen.height - TAM_CUADRO), TAM_CUADRO, TAM_CUADRO, TAM_CUADRO * randomInt(this.cantidadCuadros), 2, TAM_CUADRO, TAM_CUADRO);
                } else {
                    this.contexto.drawImage(this.imagen, random(this.imagen.width - TAM_CUADRO), random(this.imagen.height - TAM_CUADRO), TAM_CUADRO, TAM_CUADRO, TAM_CUADRO * this.contador, 2, TAM_CUADRO, TAM_CUADRO);
                    this.estaCompleto()
                    // console.log("completo : " + this.estaCompleto());


                }
                ++this.contador;
            }


            if (this.cicloBasura == 0) {
                this.gerarBasura(this.contaminacion)
                //this.mouseSobreCanvas() ;  
                this.contaminacion += randomMin (-1,2);
                console.log(this.nombre+"  cont"+this.contaminacion);
            }



            this.avanzar();
           // this.mouseSobreCanvas();   xq no va?
            // 
        };



    }


    function Zona(x, y, x2, y2) {
        //-- ATRIBUTOS
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;

        //-- METODOS

    }


    function GeneradorBasura() {

        this.alfabeto = "abcdefghijklmnopqrstuvwxyz!¿? .,:!¡{}[]12345678901010100001111-__*%!#$%&/()=";

        this.contaminar = function(magnitud) {
            var basura = " ";
            var a = randomInt(magnitud);
            for (var i = 0; i < a; i++) {
                basura = basura + this.alfabeto[randomInt(this.alfabeto.length) - 1];
            }

            return basura;
        };



    }

    //-------- VARIABLES Y CONSTANTES
    var TEMPO = 50;
    var TAM_CUADRO = 40;


//Entorno(nombre, img, tamCanvas, x, y, x2, y2, cicloVarImg, cicloVarBasura)
    var entorno1 = new Entorno("bsas", "img1", 3500, 1450, 0, 2100, 3300, 2, 20);
    var entorno2 = new Entorno("lago", "img2", 5000, 0, 2500, 4200, 3100, 13, 30);
    var entorno3 = new Entorno("boleto", "img3", 5000, 4000, 0, 5500, 4700, 30, 10);
    var entorno4 = new Entorno("billete", "img4", 3000, 2000, 2000, 2500, 6000, 3, 1);

    loop();


    function loop() {
        entorno1.dibujar();
        entorno2.dibujar();
        entorno3.dibujar();
        entorno4.dibujar();

        //   console.log(window.scrollX);
//        $("bsas").hover(function() {
//                $("body" ).css('background',('#ff0000'));
//                console.log("cont = " );
//            });


        setTimeout(loop, TEMPO);

        //    ctx.drawImage(img, random(img.width - TAM_CUADRO), random(img.height - TAM_CUADRO), TAM_CUADRO, TAM_CUADRO, TAM_CUADRO * posActual, 0, TAM_CUADRO, TAM_CUADRO);
        //  ++posActual;
        //console.log(posActual);
//        $('#basura').prepend("  <div class='libre' id=" + loopCount + "><p> df  </p></div>");
//        $('#' + loopCount).css({'color': randomColorBN(), 'font-size': randomMin(0.1, 2) + 'em', 'width': '20px', 'height': '20px', 'left': randomMin(0, 3000), 'top': randomMin(0, 3000), 'z-index': randomMin(-10, -100)});
//        //,'outline':'solid red 1px'
        // console.log(randomColorBN());
        // ++loopCount;

    }
//
//    function dibujar(img, ctx, pos) {
//        //var i = new Image();
//        //i.src = dirImg+img;
//        pos = 1;
//        //drawImage(imagen, imgX, imgY, imgAncho, imgAlto, lienzoX, lienzoY, LienzoAncho, LienzoAlto)  
//        //   ctx.drawImage(i,600,500, TAM_CUADRO,TAM_CUADRO,0,0,TAM_CUADRO,TAM_CUADRO);
//        ctx.drawImage(img, 0, 0);
//    }



    function actualizarAudio() {

    }

    function getPosicion() {

    }

});