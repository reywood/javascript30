const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu-item');
const menuHighlight = document.createElement('div');
menuHighlight.classList.add('menu-highlight');
document.body.appendChild(menuHighlight);

menuItems.forEach((menuItem) => {
    menuItem.addEventListener('mouseenter', (e) => {
        setTimeout(() => {
            const detail = e.target.querySelector('.menu-item-detail');
            const boundingRect = detail.getBoundingClientRect();
            menuHighlight.style.transform = `translate(${boundingRect.left + window.scrollX}px, ${boundingRect.top + window.scrollY}px)`;
            menuHighlight.style.width = `${boundingRect.width}px`;
            menuHighlight.style.height = `${boundingRect.height}px`;
            menuHighlight.style.opacity = '1';
        }, 10);
    });

    // menuItem.addEventListener('mouseout', () => {
    //     menuHighlight.style.opacity = '0';
    // });
});
