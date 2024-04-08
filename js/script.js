    import tabs from './modules/tabs';
    import cards from './modules/cards';
    import forms from './modules/forms';
    import modal from './modules/modal';
    import slider from './modules/slider';
    import calc from './modules/calc';
    import timer from './modules/timer';
    import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);  //setam intervalul de timp dupa care sa apara fereastra modal

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide', 
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
    timer('.timer', '2024-09-19');

}); 
