function calc() {
    //Calculator

    const result = document.querySelector('.calculating__result span');  //primim resultatul final

    let sex, height, weight, age, ratio;  //cream variabilele de care avem nevoie

    if(localStorage.getItem('sex')) {  //daca in local storage avem deja setata cheia sex
        sex = localStorage.getItem('sex');  //in document selectam sexul din localStorage
    } else {
        sex = 'female';  //setam sexul manual
        localStorage.setItem('sex', 'female');  //il punem in localStorage
    }

    
    if(localStorage.getItem('ratio')) {  //cu ratio la fel ca la sex
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function initLocalSettings(selector, activeClass) {  //cream functia care va utiliza datele din local storage
        const elements = document.querySelectorAll(selector);  //primim selectorul indicat ca argument

        elements.forEach(elem => {
            elem.classList.remove(activeClass);  //remove la clasul activ
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {  //verificam daca avem id si daca e il luam din local storage
                elem.classList.add(activeClass);  //adaugam clasul active
            }

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {  //la ratio la fel
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');  //initiem functia initLocalSettings cu argument gender pentru sex siclasul activ
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() {  //cream functia care calculeaza totalul
        if (!sex || !height || !weight || !age || !ratio) {  //daca niciunul din campuri nu vor fi completate 
            result.textContent = '___';  //punem **** in locul la resultatul total
            return;  //in cazul in care mai sus avem false, oprim functia
        }

        if(sex === 'female') {  //daca sex este femeie
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);  //in result calculam dupa formula
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);  //in result calculam dupa formula
        }
    }
    
    calcTotal();

    function getStaticInformation(selector, activeClass) {  //primim informatia si dam ca argument functia de mai jos
        const elements = document.querySelectorAll(selector);  //primim toate div-urile

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {  //la argumentul parent selector ii adaugam event click
                if(e.target.getAttribute('data-ratio')) {  //verificam daca obiectul evenimentului are data-ratio
                    ratio = +e.target.getAttribute('data-ratio');  //primim de la e.target si o bagam in ratio 
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));  //memoram in local storage data-ration
                } else {
                    sex = e.target.getAttribute('id');  //primim atributul id 
                    localStorage.setItem('sex', e.target.getAttribute('id'));  //memoram in local storage sexul
                }
    
                elements.forEach(elem => {  //cautare forEach
                    elem.classList.remove(activeClass);  //eliminam clasul active
                });
    
                e.target.classList.add(activeClass);  //adaugam active
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {  //cream functia care va primi datele din inpututi
        const input = document.querySelector(selector);  //primim din document elementul dat ca argument in functie

        input.addEventListener('input', () => {  //adaugam evenimentul input la input

            if(input.value.match(/\D/g)) {  //folosind expresii regulate verificam daca inputul contine valori non numerice
                input.style.border = '1px solid red';  //daca contine valori non numerice vom atribui inputului contur rosu
            } else {
                input.style.border = 'none';  //daca nu, nui atribuim contur
            }

            switch(input.getAttribute('id')) {  //folosim constructia switch,case si verificam dupa id 
                case 'height':
                    height = +input.value;  //inscrim in variabila height valoarea inscrisa in inputul cu id height
                    break;
                case 'weight':
                    weight = +input.value;  //inscrim in variabila weight valoarea inscrisa in inputul cu id weight
                    break;
                case 'age':
                    age = +input.value;  //inscrim in variabila age valoarea inscrisa in inputul cu id age
                    break;
            }
            
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;