function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function debounce2(...args) {
        const context = this;
        function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const sliderImages = document.querySelectorAll('.slide-in');

function slideImagesInOnScroll() {
    // console.log('win', window.scrollY);
    sliderImages.forEach((sliderImage) => {
        // console.dir(sliderImage);
        const windowBottomScrolledTo = window.scrollY + window.innerHeight;
        const slideInAt = sliderImage.offsetTop + (sliderImage.offsetHeight / 3);
        const isScrolledPastMiddle = windowBottomScrolledTo >= slideInAt;
        const imageBottom = sliderImage.offsetTop + sliderImage.offsetHeight;
        const isScrolledPastImage = window.scrollY > imageBottom;

        if (isScrolledPastMiddle && !isScrolledPastImage) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}


window.addEventListener('scroll', debounce(slideImagesInOnScroll));
