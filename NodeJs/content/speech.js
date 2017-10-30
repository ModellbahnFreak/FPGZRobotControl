var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var grammar = '#JSGF V1.0; grammar colors; public <color> = straight | stop | right | left;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

/*document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}*/


recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;
  //alert(color);
  console.log("Speech command: " + color);
  document.getElementById("SpeechOut").innerHTML = "Speech command: " + color;
  switch (color) {
    case "straight":
	  Senden('forward');
	  break;
	case "left":
	  Senden('left');
	  break;
	case "right":
	  Senden('right');
	  break;
	case "stop":
	  Senden('stop');
	  break;
	case "behind":
	  Senden('reverse');
	  break;
	case "back":
	  Senden('reverse');
	  break;
	case "end":
	  break;
	default:
	  alert("Error. Understood: " + color);
	  break;
  }
  if (color != "end") {
    setTimeout(startRec, 1000);
  } else {
    //document.getElementById("sprache").style.backgroundColor = "#09951C";
  }
}

function startRec() {
  console.log('Ready to receive a speech command.');
  document.getElementById("SpeechOut").innerHTML = 'Ready to receive a speech command.';
  recognition.start();
  //document.getElementById("sprache").style.backgroundColor = "#E2E2E2";
}

/*var synth = window.speechSynthesis;
var Sprachen = [];

function SprachenLaden() {
  Sprachen = synth.getVoices();
  for(i = 0; i < Sprachen.length ; i++) {
    console.log(Sprachen[i].lang);
  }
}
SprachenLaden();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = SprachenLaden;
}

//function Spreche(text, Sprache) {
  var SprechText = new SpeechSynthesisUtterance(text);
  for (var i = 0; i < Sprachen.length; i++) {
    if (Sprachen[i].lang == Sprache) {
      SprechText.voice = Sprachen[i];
    }
  }
  SprechText.voice = Sprachen[Sprache];
  SprechText.pitch = 1;
  SprechText.rate = 1;
  console.log(SprechText);
  synth.speak(SprechText);
//}*/