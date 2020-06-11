function modals() {
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
}

export default modals;