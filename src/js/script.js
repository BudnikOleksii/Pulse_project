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
          overlay = document.querySelector('.overlay'),
          modalConsult = document.querySelector('#consultation'),
          modalOrder = document.querySelector('#order'),
          modals = document.querySelectorAll('.modal'),
          scroll = calcScroll(),
          modalTimerId = setInterval(showModal, 60000);

    function showModal(modal = modalConsult) {
        overlay.classList.add('animated', 'fadeIn');
        modal.classList.add('animated', 'fadeIn');
        overlay.style.display = "block";
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
        clearInterval(modalTimerId);
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

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && overlay.style.display === "block") {
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

    function showModalByScroll() {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

        if (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
            showModal(modalConsult);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо за вашу заявку! Наш менеджер свяжется с вами в ближайшее время!',
        failure: 'Что-то пошло не так...',
        spinner: 'icons/forms/spinner.svg',
        ok:'icons/forms/ok.png',
        fail:'icons/forms/fail.png'
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.parentNode.append(statusMessage);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.append(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.append(textMessage);

            const formData = new FormData(form);

            // convert to json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                });
        });
    });
});