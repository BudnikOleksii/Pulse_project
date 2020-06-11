'use strict';

import slider from './modules/slider';
import tabs from './modules/tabs';
import modals from './modules/modals';
import forms from './modules/forms';
import checkEmailsInputs from './modules/checkEmailsInputs';
import validationMask from './modules/validationMask';
import scroll from './modules/scroll';

window.addEventListener('DOMContentLoaded', () => {
    slider();
    tabs();
    modals();
    forms();
    checkEmailsInputs();
    validationMask();
    scroll();
});