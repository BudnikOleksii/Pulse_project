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

    // Modals
    const btnConsult = document.querySelectorAll('[data-consult]'),
          btnOrder = document.querySelectorAll('.button_mini'),
          close = document.querySelectorAll('.modal__close'),
          btnSubmit =document.querySelectorAll('.button_submit'),
          overlay = document.querySelector('.overlay'),
          modalConsult = document.querySelector('#consultation'),
          modalOrder = document.querySelector('#order'),
          modalThanks = document.querySelector('#thanks'),
          modals = document.querySelectorAll('.modal'),
          scroll = calcScroll();

    function showModal(modal) {
        overlay.classList.add('animated', 'fadeIn');
        modal.classList.add('animated', 'fadeIn');
        overlay.style.display = "block";
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
    }

    function closeModal() {
        overlay.style.display = "none";
        modals.forEach(modal => modal.style.display = "none");
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
    }

    function bindModal(btns, modal) {
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                showModal(modal);
            });
        });
    }

    bindModal(btnConsult, modalConsult);
    bindModal(btnOrder, modalOrder);

    close.forEach(btn => {
        btn.addEventListener('click', () => closeModal());
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }
});