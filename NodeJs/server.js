var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	SerialPort = require('serialport'),
	//net = require('net'),
	//client = new net.Socket(),
	//parseXmlStr = require('xml2js').parseString,
	conf = require('./config.json'),
	port = new SerialPort(conf.ComPort);

//app.use(express.static(path.join(__dirname, 'content')));
//app.use('/', express.static(path.join(__dirname, 'content', 'index.html')));

server.listen(conf.port);

console.log('Vor');

app.use(express.static(__dirname + '/content'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/content/index.html');
});

io.sockets.on('connection', function (socket) {
	console.log('Connected with: ' + socket.handshake.address);
	socket.emit('Lego', {Status: 'Connected sucessfully', StatusCode: 201});
	socket.on('Lego', function (data) {
		switch (data.Content) {
		case "forward":
			port.write("1", function(err) {
				if (err) {
					return console.log('Error on write: ', err.message);
				}
				console.log('message written');
			});
			break;
		case "reverse":
			port.write("2", function(err) {});
			break;
		case "left":
			port.write("3", function(err) {});
			break;
		case "right":
			port.write("4", function(err) {});
			break;
		case "stop":
			port.write("0", function(err) {});
			break;
		case "null":
			port.write("5", function(err) {});
			break;
		case "speed":
			port.write(String.fromCharCode(54), function(err) {});//=6
			var Geschw = data.Val;
			if (Geschw > 255 || Geschw < 0) {
				Geschw = 0;
			}
			port.write(String.fromCharCode(Geschw), function(err) {});//=Wert
			break;
		}
		console.log('Got Client Msg: ');
		console.log(data);
	});
	//Timer senden
	/*myEvent.on('Timer', function (Zeit) {
		io.sockets.emit('ZZA', {Status: 'Time Code', StatusCode: 202, Content: Zeit});
	});*/
	//Inhalt senden
	/*myEvent.on('Content', function (SendDaten) {
		io.sockets.emit('ZZA', {Status: 'Data update', StatusCode: 200, Content: SendDaten});
	});*/
});

console.log("SocketIO init");

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
});
port.on('readable', function () {
  console.log('Serialdata: ', port.read());
});

console.log("SerialInit");

console.log("Lauft");