const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdown-background');
const nav = document.querySelector('.top');

function handleEnter() {
    this.classList.add('trigger-enter');
    setTimeout(() => {
        if (this.classList.contains('trigger-enter')) {
            this.classList.add('trigger-enter-active');
        }
    }, 150);
    const dropdown = this.querySelector('.dropdown');
    const dropdownRect = dropdown.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const left = (dropdownRect.left - navRect.left);
    const top = (dropdownRect.top - navRect.top);
    background.style.transform = `translate(${left}px, ${top}px)`;
    background.style.width = `${dropdownRect.width}px`;
    background.style.height = `${dropdownRect.height}px`;
    background.classList.add('open');
}

function handleLeave() {
    this.classList.remove('trigger-enter-active', 'trigger-enter');
    background.classList.remove('open');
}

triggers.forEach((trigger) => {
    trigger.addEventListener('mouseenter', handleEnter);
    trigger.addEventListener('mouseleave', handleLeave);
});
