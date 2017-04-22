function lightenEffect(pixels) {
    const newPixels = pixels;
    const lightenAmount = 200;
    for (let i = 0; i < newPixels.data.length; i += 4) {
        newPixels.data[i] += lightenAmount;
        newPixels.data[i + 1] += lightenAmount;
        newPixels.data[i + 2] += lightenAmount;
        // newPixels.data[i + 3] = 100;
    }
    return newPixels;
}

function greenScreen(pixels) {
    const newPixels = pixels;
    const inputs = Array.from(document.querySelectorAll('.rgb input'));
    const levels = Object.assign({}, ...inputs.map(i => ({ [i.name]: parseInt(i.value, 10) })));
    for (let i = 0; i < newPixels.data.length; i += 4) {
        const [r, g, b] = newPixels.data.slice(i, i + 3);
        if (isGreenScreenColor(levels, r, g, b)) {
            newPixels.data[i + 3] = 0;
        }
    }
    return newPixels;
}

function isGreenScreenColor(levels, r, g, b) {
    return (
        r > levels.rmin && r < levels.rmax &&
        g > levels.gmin && g < levels.gmax &&
        b > levels.bmin && b < levels.bmax
    );
}

function redEffect(pixels) {
    const newPixels = pixels;
    for (let i = 0; i < newPixels.data.length; i += 4) {
        newPixels.data[i + 0] = Math.min(newPixels.data[i + 0] + 100, 255);
        newPixels.data[i + 1] = Math.max(newPixels.data[i + 1] - 50, 0);
        newPixels.data[i + 2] = (newPixels.data[i + 2] * 0.5);
        // newPixels.data[i + 1] = 0;
        // newPixels.data[i + 2] = 0;
        // newPixels.data[i + 3] = newPixels.data[i + 0];
    }
    return newPixels;
}

function rgbSplit(pixels) {
    const newPixels = pixels;
    for (let i = 0; i < newPixels.data.length; i += 4) {
        newPixels.data[i - 150] = newPixels.data[i];
        newPixels.data[i + 500] = newPixels.data[i + 1];
        newPixels.data[i - 450] = newPixels.data[i + 2];
        // newPixels.data[i + 3] = 100;
    }
    return newPixels;
}
