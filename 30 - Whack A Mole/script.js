const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;

function startGame() {
    const endTimestamp = Date.now() + (10 * 1000);
    scoreBoard.textContent = 0;
    showMoles(endTimestamp);
}

function bonk(e) {
    e.preventDefault();
    const oldScore = parseInt(scoreBoard.textContent, 10);
    scoreBoard.textContent = oldScore + 1;
    this.parentNode.classList.remove('up');
}

function showMole(hole) {
    const mole = hole.querySelector('.mole');
    mole.removeEventListener('click', bonk, { once: true });
    mole.addEventListener('click', bonk, { once: true });
    hole.classList.add('up');
}

function showMoles(endTimestamp) {
    if (endTimestamp < Date.now()) {
        return;
    }

    const hole = randHole(holes);
    showMole(hole);
    setTimeout(() => {
        hole.classList.remove('up');
        showMoles(endTimestamp);
    }, randTime(500, 1000));
}

function randTime(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

function randHole(possibleHoles) {
    let nextHole;
    while (!nextHole || nextHole === lastHole) {
        nextHole = possibleHoles[Math.floor(Math.random() * possibleHoles.length)];
    }
    lastHole = nextHole;
    return nextHole;
}
