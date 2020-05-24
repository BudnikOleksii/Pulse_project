'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // Slider
  const prev = document.querySelector('.carousel__prev'),
        next = document.querySelector('.carousel__next'),
        slides = document.querySelectorAll('.carousel__slide');

    let slideIndex = 1;

    function showSlides(n) {
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.add('animated');
        });

        slides[n - 1].style.display = 'block';
    }

    function plusSlides(n) {
        slideIndex += n;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        if (slideIndex < 1) {
            slideIndex = slides.length;
        }
        
        if (n === -1) {
            slides[slideIndex - 1].classList.remove('slideInLeft');
            slides[slideIndex - 1].classList.add('slideInRight');
        } else {
            slides[slideIndex - 1].classList.remove('slideInRight');
            slides[slideIndex - 1].classList.add('slideInLeft');
        }
        showSlides(slideIndex);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });

    let paused = setInterval(() => plusSlides(1), 5000);
    slides[slideIndex - 1].addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    slides[slideIndex - 1].addEventListener('mouseleave', () => {
        paused = setInterval(() => plusSlides(1), 5000);
    });
    
    showSlides(slideIndex);
});