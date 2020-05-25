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

    // Tabs
    const tabs = document.querySelectorAll('.catalog__tab'),
          tabsContent = document.querySelectorAll('.catalog__content'),
          tabsParent = document.querySelector('.catalog__tabs');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('catalog__content_active');
            item.classList.add('animated', 'fadeInUp');
        });
        tabs.forEach(item => {
            item.classList.remove('catalog__tab_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('catalog__content_active');
        tabs[i].classList.add('catalog__tab_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.parentNode.classList.contains('catalog__tab')) {
            tabs.forEach((item, i) => {
                if (target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    const moreLink = document.querySelectorAll('.catalog-item__link'),
          moreBack = document.querySelectorAll('.catalog-item__back'),
          itemContent = document.querySelectorAll('.catalog-item__content'),
          moreList = document.querySelectorAll('.catalog-item__list');

    function toggleMoreList (trigger) {
        trigger.forEach((link, i) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                itemContent[i].classList.toggle('catalog-item__content_active');
                moreList[i].classList.toggle('catalog-item__list_active');
            });
        });
    }
    toggleMoreList(moreLink);
    toggleMoreList(moreBack);
});