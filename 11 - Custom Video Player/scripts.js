const player = document.querySelector('.player');
const video = player.querySelector('video');
const controls = player.querySelector('.player__controls');
const progress = controls.querySelector('.progress');
const progressBuffered = controls.querySelector('.progress__buffered');
const progressFilled = controls.querySelector('.progress__filled');
const playPauseButton = controls.querySelector('button.toggle');
const volume = controls.querySelector('input[name="volume"]');
const playbackRate = controls.querySelector('input[name="playbackRate"]');
const skipButtons = controls.querySelectorAll('button[data-skip]');
const fullScreenButton = controls.querySelector('button.full-screen');

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function scrub(e) {
    const skipTo = video.duration * (e.offsetX / progress.offsetWidth);
    video.currentTime = skipTo;
}

playPauseButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', () => {
    playPauseButton.textContent = '❙❙';
});
video.addEventListener('pause', () => {
    playPauseButton.textContent = '▶';
});

video.addEventListener('timeupdate', () => {
    const percentComplete = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percentComplete}%`;
    progressFilled.style.flexBasis = `${percentComplete}%`;
});

video.addEventListener('progress', () => {
    if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const percentComplete = (bufferedEnd / video.duration) * 100;
        progressBuffered.style.width = `${percentComplete}%`;
    }
});

let scrubbing = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => {
    scrubbing = true;
});
window.addEventListener('mouseup', () => {
    scrubbing = false;
});
window.addEventListener('mouseout', () => {
    scrubbing = false;
});
progress.addEventListener('mousemove', (e) => {
    if (scrubbing) {
        scrub(e);
    }
});

volume.addEventListener('change', () => {
    // console.log(e, volume.value);
    video.volume = volume.value;
});

playbackRate.addEventListener('change', () => {
    video.playbackRate = playbackRate.value;
});

skipButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const skip = parseFloat(button.dataset.skip, 10);
        video.currentTime += skip;
    });
});

fullScreenButton.addEventListener('click', () => {
    video.webkitRequestFullscreen();
});
