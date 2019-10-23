//Init SpeechSynth API
const synth = window.speechSynthesis;

//DOM Elements
const form = document.querySelector('form');
const textarea = document.querySelector('#text');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const selectVoice = document.querySelector('#voice-select');
const button = document.querySelector('#speak');
const body = document.querySelector("body");

//Init  Voices Array
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();
    //Loop Through voices and create an option for each one
    voices.forEach(voice => {

        //create option element

        const option = document.createElement("option");
        //Fill option with voice and language
        option.textContent = `${voice.name} (${voice.lang})`;

        //Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        //Append Option to Select
        selectVoice.appendChild(option);

    });
}
getVoices();

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
    selectVoice.innerHTML = getVoices.name;
}

//Speak
const speak = () => {
    
    if (synth.speaking) {
        console.error(`Already Speaking ...`);
        return;
    }
    if (textarea.value !== '') {
        body.style.background = "#000 url('img/wave.gif')";
        body.style.color = "#fff";
        body.style.backgroundRepeat = "repeat-x";
        body.style.backgroundSize = "100% 100%";
        //Get Speak Text
        const speakText = new SpeechSynthesisUtterance(textarea.value);
        //Speak End
        speakText.onend = e => {
            console.log(`Done Speaking... `);
            body.style.background = "#fff";
            body.style.color = "#000";
        };

        speakText.onerror = e => {
            console.log(`Something Went Wrong....`);
        };

        //Selected Voice
        const selectedVoice = selectVoice.selectedOptions[0].getAttribute('data-name');

        //Loop Through Voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        //Set Pitch and Rate
        speakText.pitch = pitch.value;
        speakText.rate = rate.value;

        //speak
        synth.speak(speakText);
    }
};
//Event
form.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textarea.blur();
});

//Rate Value Change
rate.addEventListener('change', e => {
    rateValue.textContent = rate.value;
});

//Pitch Value Change
pitch.addEventListener('change', e => {
    pitchValue.textContent = pitch.value;
});

//Voice Select Change

selectVoice.addEventListener('change', e => speak());
