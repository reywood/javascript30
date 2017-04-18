const timeElements = Array.from(document.querySelectorAll('li[data-time]'));
const totalSeconds = timeElements.reduce((total, timeElem) => {
    const time = timeElem.dataset.time;
    const [minutes, seconds] = time.split(':').map(n => parseInt(n, 10));
    return total + (minutes * 60) + seconds;
}, 0);

console.log(totalSeconds);

const seconds = totalSeconds % 60;
const minutes = Math.floor(totalSeconds / 60) % 60;
const hours = Math.floor(totalSeconds / 60 / 60);

console.log(`total: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
