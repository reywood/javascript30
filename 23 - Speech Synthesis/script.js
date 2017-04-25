const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

function speak() {
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
}

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices();
        // .filter(voice => voice.lang.startsWith('en'));
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.voiceURI}">${voice.name} (${voice.lang})</option>`)
        .join('');
});

voicesDropdown.addEventListener('change', () => {
    msg.voice = voices.find(voice => voice.voiceURI === voicesDropdown.value);
    speak();
});

speakButton.addEventListener('click', speak);

options.forEach((option) => {
    option.addEventListener('change', (e) => {
        msg[e.target.name] = e.target.value;
        speak();
    });
});

stopButton.addEventListener('click', () => {
    speechSynthesis.cancel();
});
