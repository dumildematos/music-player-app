function Alert(name){
  alert(`Hey there! ${name}`);
  var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.strokeText("Hello World",10,50);
}