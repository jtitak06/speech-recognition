const texts = document.querySelector(".texts");
var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

let p = document.createElement("p");

recognition.addEventListener('result', (event) => {
    let text = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    p.innerText = text;
    texts.appendChild(p);

    p = document.createElement('p');
    
});

function startRecording() {
    recognition.start();
    recognition.addEventListener("end", recognition.start)
  
    document.getElementById("stop").addEventListener("click", stopRecording)
};

function stopRecording() {
    recognition.removeEventListener("end", recognition.start)
    recognition.stop();
  }