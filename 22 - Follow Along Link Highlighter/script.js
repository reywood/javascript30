// 👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀

const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);

// function getTotalOffset(element, offsetProp) {
//     let currentElement = element;
//     let total = 0;
//     while (currentElement) {
//         total += currentElement[offsetProp];
//         currentElement = currentElement.offsetParent;
//     }
//     return total;
// }

triggers.forEach((trigger) => {
    trigger.addEventListener('mouseenter', (e) => {
        const boundingRect = e.target.getBoundingClientRect();
        highlight.style.transform = `translate(${boundingRect.left}px, ${boundingRect.top + window.scrollY}px)`;
        highlight.style.height = `${boundingRect.height}px`;
        highlight.style.width = `${boundingRect.width}px`;

        // highlight.style.top = `${getTotalOffset(e.target, 'offsetTop')}px`;
        // highlight.style.left = `${getTotalOffset(e.target, 'offsetLeft')}px`;
        // highlight.style.height = `${e.target.offsetHeight}px`;
        // highlight.style.width = `${e.target.offsetWidth}px`;
    });
});
