const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 200;

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) {
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }

    xWalk = Math.round((x / width * walk) - (walk / 2));
    yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, .7),
        ${-xWalk}px ${yWalk}px 0 rgba(0, 255, 255, .7),
        ${xWalk}px ${-yWalk}px 0 rgba(255, 255, 0, .7),
        ${-xWalk}px ${-yWalk}px 0 rgba(0, 255, 0, .7)
    `;
}

hero.addEventListener('mousemove', shadow);
