const nav = document.querySelector('nav#main');
const logo = document.querySelector('nav#main .logo');
const navTop = nav.offsetTop;

window.addEventListener('scroll', () => {
    if (navTop > window.scrollY) {
        document.body.classList.remove('fixed-nav');
    } else {
        document.body.classList.add('fixed-nav');
    }
});
