window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
    // for (let result of )
    const rawResults = Array.from(e.results);
    const results = rawResults
        .reduce((allResults, result) => allResults.concat(Array.from(result)), [])
        .map(result => result.transcript)
        .join(' ');
    const isFinal = rawResults.reduce((final, result) => final || result.isFinal, false);
    p.textContent = results;

    // if (isFinal) {
    //     p = document.createElement('p');
    //     words.appendChild(p);
    // }
});

recognition.addEventListener('end', () => {
        p = document.createElement('p');
        words.appendChild(p);
    recognition.start();
});

recognition.start();
