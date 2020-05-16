window.addEventListener('DOMContentLoaded', () => {
    // Slider
    const slider = document.querySelector('.carousel'),
          slidesWrapper = slider.querySelector('.carousel__wrapper'),
          prev = slider.querySelector('.carousel__prev'),
          next = slider.querySelector('.carousel__next'),
          slidesField = slidesWrapper.querySelector('.carousel__inner'),
          slides = slidesWrapper.querySelectorAll('.carousel__slide'),
          width = window.getComputedStyle(slidesWrapper).width;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    });
    
});