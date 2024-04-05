window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          calc = require('./modules/calc'),
          timer = require('./modules/timer');

    tabs();
    calc();
    cards();
    forms();
    modal();
    slider();
    timer();
}); 
