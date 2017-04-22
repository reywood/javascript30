// const video = document.querySelector('.player');
const video = document.createElement('video');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const greenscreenBg = new Image();
greenscreenBg.src = 'beach.jpg';

function getVideo() {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((localMediaStream) => {
            video.src = window.URL.createObjectURL(localMediaStream);
            return video.play();
        })
        .catch(error => console.error('Need access to webcam', error));
}

function paintToCanvas() {
    const bufferCanvas = document.createElement('canvas');
    const bufferCtx = bufferCanvas.getContext('2d');

    [canvas.width, canvas.height] = [video.videoWidth, video.videoHeight];
    [bufferCanvas.width, bufferCanvas.height] = [canvas.width, canvas.height];
    setInterval(() => {
        // bufferCtx.globalAlpha = 0.1;

        bufferCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
        let videoPixels = bufferCtx.getImageData(0, 0, canvas.width, canvas.height);

        // videoPixels = rgbSplit(videoPixels);
        // videoPixels = lightenEffect(videoPixels);
        videoPixels = greenScreen(videoPixels);
        // videoPixels = redEffect(videoPixels);

        bufferCtx.putImageData(videoPixels, 0, 0);

        ctx.drawImage(greenscreenBg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bufferCanvas, 0, 0);
    }, 200);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const dataUrl = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.setAttribute('download', 'funtimes');
    // link.textContent = 'Download Image';
    const img = document.createElement('img');
    img.src = dataUrl;
    img.width = 100;
    img.height = 100;
    link.appendChild(img);
    strip.insertBefore(link, strip.firstChild);
}

window.addEventListener('load', () => {
    getVideo().then(paintToCanvas);
});

document.querySelector('button.take-photo').addEventListener('click', takePhoto);
