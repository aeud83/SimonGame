//**************************VARIABLES GLOBALES***************************************************
var Colores = ["Verde", "Rojo", "Amarillo", "Azul"];
var Iniciar = false;
var Juego = [];
var Jugador = [];
var NumeroRamdom = 1;
var Nivel = 1;

//**************************FUNCIONES*********************************************************************

function Inicio() {
  Iniciar = true;
  Juego = [];
  Jugador = [];
  Nivel = 1;
  $("#Estacion").text("Nivel " + Nivel);
  $("#Estacion").addClass("InicioDeNivel");
  $("#Estacion").animate({ margin: "3rem" });
  NumeroRamdom = RamdonNumero();
  Juego.push(NumeroRamdom);
  console.log(Juego);
  Animacion(Colores[NumeroRamdom - 1]);
  setTimeout(function() { SonidoBoton(Colores[NumeroRamdom -1]); }, 500);

}

function RamdonNumero() {
  var Num = Math.random() * 4;
  Num = Math.floor(Num) + 1;
  return (Num);
}

function UsuarioClic(boton) {
   var Boton = boton;
   $("#" + Boton).css("background-image", "url(Styles/Images/" + Boton + "P.png)");
   setTimeout(function() { $("#" + Boton).css("background-image", "url(Styles/Images/" + Boton + ".png)"); }, 200);
}

function Animacion(boton) {
   var Boton = "#" + boton;
   setTimeout(function() {
   $(Boton).addClass("btnSeleccionado"); }, 700);
   setTimeout(function() { $(Boton).removeClass("btnSeleccionado"); }, 900);
}

function Avanzar(){
  Nivel++;
  $("#Estacion").text("Nivel " + Nivel);
  var Num = RamdonNumero();
  Juego.push(Num);
  Animacion(Colores[Num - 1]);
  Jugador = [];
  setTimeout(function() { SonidoBoton(Colores[Num - 1]); }, 500);
}

function SonidoBoton(color){
  var Color = color;
  var GOVER = new Audio("sounds/" + Color + ".mp3");
  GOVER.play();
}

function GameOver(){
  $("#Estacion").text("Secuencia Incorrecta!!.. Juego Terminado!!");
  Iniciar = false;
  $("#Cuerpo").css("background-color", "#FF4000");
  setTimeout(function() { $("#Cuerpo").css("background-color", "#795548"); }, 400);
  var GOVER = new Audio("sounds/wrong.mp3");
  GOVER.play();
  $("#MCulto").css("visibility", "visible");
}

// //****************************************ESTRUCTURA*******************************************************************************
$(document).keypress(function() {
  if (Iniciar === false){
    $("#MCulto").css("visibility", "hidden");
    Inicio();
  }
});

$(".btn").on("click", function() {
  if (Iniciar === true){
    UsuarioClic(this.id);
    SonidoBoton(this.id);
    Jugador.push(Colores.indexOf(this.id) + 1); // Me Devuelve la posicion del Elemento dentro del arreglo);
    if (Juego[Jugador.length - 1] === Jugador[Jugador.length - 1]){
       if (Jugador.length === Juego.length){
         Avanzar();
       } else
      console.log("Esperando Jugada");
    } else {
      GameOver();
    }
  }
});
