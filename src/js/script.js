'use strict';

import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMore from './modules/toggleMore';
import modals from './modules/modals';
import forms from './modules/forms';
import checkEmailsInputs from './modules/checkEmailsInputs';
import validationMask from './modules/validationMask';
import scroll from './modules/scroll';

window.addEventListener('DOMContentLoaded', () => {
    slider('.carousel__prev', '.carousel__next', '.carousel__slide');
    tabs('.catalog__tab', '.catalog__content', '.catalog__tabs', 'catalog__content_active', 'catalog__tab_active');
    toggleMore('.catalog-item__link', 
        '.catalog-item__back', 
        '.catalog-item__content', 
        '.catalog-item__list', 
        'catalog-item__content_active', 
        'catalog-item__list_active');
    modals();
    forms();
    checkEmailsInputs('[name="email"]');
    validationMask('[name="phone"]');
    scroll();
});