const timerButtons = document.querySelectorAll('.timer__button');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const customForm = document.getElementById('custom');
const minutesInput = customForm.querySelector('[name="minutes"]');
let interval;

function padNumber(number, pad) {
    let padded = `${number}`;
    while (padded.length < pad) {
        padded = `0${padded}`;
    }
    return padded;
}

function getHours(date) {
    const hours = date.getHours();
    if (hours === 0) {
        return 12;
    }
    if (hours <= 12) {
        return hours;
    }
    return hours - 12;
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = getHours(date);
    const minutes = padNumber(date.getMinutes(), 2);
    const ampm = date.getHours() < 12 ? 'am' : 'pm';

    return `${hours}:${minutes}${ampm}`;
}

function formatTimeRemaining(secondsLeft) {
    const hours = Math.floor(secondsLeft / 60 / 60);
    const minutes = padNumber(Math.floor((secondsLeft / 60) % 60), 2);
    const seconds = padNumber(Math.round(secondsLeft % 60), 2);

    if (hours > 0) {
        return `${hours}:${minutes}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

function displayTimeRemaining(secondsLeft) {
    const formatted = formatTimeRemaining(secondsLeft);
    timeLeft.textContent = formatted;
    document.title = formatted;
}

function timer(seconds) {
    const end = Date.now() + (seconds * 1000);

    clearInterval(interval);
    document.body.classList.remove('timer-done');

    endTime.textContent = `Be back at ${formatTime(end)}`;

    displayTimeRemaining(seconds);
    interval = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft < 0) {
            document.body.classList.add('timer-done');
            clearInterval(interval);
            return;
        }

        displayTimeRemaining(secondsLeft);
    }, 1000);
}

timerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        timer(parseInt(button.dataset.time, 10));
    });
});

customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    timer(parseInt(minutesInput.value, 10) * 60);
});
