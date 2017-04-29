const speed = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');
const video = document.querySelector('.video');

const minRate = 0.5;
const maxRate = 4;

speed.addEventListener('mousemove', (e) => {
    const ratio = e.offsetY / speed.offsetHeight;

    bar.style.height = `${100 * ratio}%`;

    const playbackRate = (minRate + (ratio * (maxRate - minRate))).toFixed(1);
    bar.textContent = `${playbackRate}x`;
    video.playbackRate = playbackRate;
});
