var socket = null;
/*function Process() {
  var elem = document.getElementById("Befehl");
  if(elem.value != "") {
    Senden(elem.value);
    elem.value = "";
  }
  
}*/
socket = io.connect();
socket.on('Lego', function (data) {

});
function Senden(text) {
	socket.emit('Lego', {Status: 123, Content: text});
}
function Speed() {
	var Geschw = document.getElementById("geschw").value;
	socket.emit('Lego', {Val: Geschw, Content: "speed"});
}