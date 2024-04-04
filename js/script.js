window.addEventListener('DOMContentLoaded', function() {

    // TABS
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() { 
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {  
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) { 
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});


    // TIMER

    const deadline = '2024-06-17';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        }
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function getZero(num) {
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days),
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    };

    setClock('.timer',deadline);


    //MODAL

    const modalTrigger = document.querySelectorAll('[data-modal]'),  //primim buttoanele de aratare a ferestrei modal
          modal = document.querySelector('.modal');  //primim fereastra modal


    function openModal() {
        modal.classList.add('show');  //se adauga show la fereastra modal 
        modal.classList.remove('hide');  //se scoade hide 
        document.body.style.overflow = 'hidden';  //nu putem face scroll
        clearInterval(modalTimerId);  //daca utilizatorul a privit singur deja fereastra modal atunci anulam pornirea automata
    }

    function closeModal() {
        modal.classList.add('hide');  //se adauga hide la fereastra modal 
        modal.classList.remove('show');  //se scoade show
        document.body.style.overflow = ''; //pornim inapoi scrollul
    }


    modalTrigger.forEach(btn => {  //pentru a lucra cu pseudomasivul modalTrigger
        btn.addEventListener('click', openModal);
    });


    modal.addEventListener('click', (e) => {  //evenimentul click pe modal si folosim obiectul evenimentului - "e"
        if(e.target === modal || e.target.getAttribute('data-close') == '') {  //daca locul unde tasteaza utilizatorul este egal cu modal, adica nu pe modal-dialog
           closeModal();  //chemam functia closeModal
        }
    });

    document.addEventListener('keydown', (e) => {  //tastarea de la tastatura
        if(e.code === 'Escape' && modal.classList.contains('show')) {  //daca e(obiectul evenimentului) este egala cu tasta escape(daca noi am tastat esc) si daca fereastra modal este desschisa
            closeModal();  //chemam functia closeModal
        }
    });


    const modalTimerId = setTimeout(openModal, 10000);  //setam intervalul de timp dupa care sa apara fereastra modal

    function showModalByScroll() {  //cream functia ce va arata fereastra modal dupa ce ajungem la sfarsitul paginii
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {  //daca distanța de la partea de sus a viewport-ului până la partea de jos a viewport-ului este egala cu înălțimea totală a întregului document
            openModal(); 
            window.removeEventListener('scroll', showModalByScroll);  //dupa ce a fost deschisa prima data fereastra modal, se sterge eventListenerul ce a deschis fereastra
        }
    }

    window.addEventListener('scroll', showModalByScroll);  //adaugam eveniment odata ce am ajut la sfarsit de pag


    // Class for Cards

    class MenuCard {  //cream clasul
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {  //cream constructorul iar ca argumente dam compenentele cardurilor
            this.src = src;  //scriem argumentele ca valori
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;  //rest operator
            this.parent = document.querySelector(parentSelector);  //DOM element 
            this.transfer = 27;  //curs valuta static ca exemplu
            this.changeToUAH();  //aici vom chema metoda changeToUAH
        }

        changeToUAH() {  //metoda pentru a schimba din dolari in grivne
            this.price = +this.price * this.transfer;  //pentru a afla valoarea in grivne
        }

        render() {  //cream aspectul siteului (верстка)
            const element = document.createElement('div');  //cream un div nou iar mai jos ii atribuim o structura noua de elemente 

            if (this.classes.length === 0) {  //daca nu a fost dat niciun argument classes
                this.element = 'menu__item'; 
                element.classList.add(this.element)  //atunci adaugam valoarea default
            } else {
                this.classes.forEach(className => element.classList.add(className));  //verificam pseudomasivul format si adaugam clasele din pseudomasiv direct pe element
            }


            element.innerHTML = `  
                <img src=${this.src} alt=${this.alt}>  
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);  //punem DOM elementul in noul div 
        }
    }


    const getResource = async (url, data) => {  //(async)codul asincron din functie va fi transformat in sincron
        const res = await fetch(url);  //In res punem promisul ce vine de la fetch

        if (!res.ok) {  //daca res nu este ok
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);  //Aruncam o noua eroare
        }

        return await res.json();  //transforma raspunsul in json
    };

    getResource('http://localhost:3000/menu') 
        .then(data => {  //datele vin de pe server
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();  //acest metod se va repeta de atatea ori cate obiecte vor fi in masiv
            });
        }); 
    
    // axios.get('http://localhost:3000/menu') 
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();  //acest metod se va repeta de atatea ori cate obiecte vor fi in masiv
    //         });
    //     });


    // Forms
    
    const forms = document.querySelectorAll('form');  //In variabila forms primim formele din html

    const message = {  //Cream un obiect cu raspunsuri diferite in caz de diferite response status
        loading: 'img/form/spinner.svg',
        success: 'Multumim! Va contactam in curand',
        failure: 'Ceva nu merge bine...'
    };

    forms.forEach(item => {  //Legam de fiecare forma functia postData
        bindOostData(item);
    });

    const postData = async (url, data) => {  //(async)codul asincron din functie va fi transformat in sincron
        const res = await fetch(url, {  //(avait), se foloseste cu async, js intelege ca codul ce urmeaza va fi sincron
            method: "POST",  //Indicam metoda
            headers: {  //Indicam titlurile
                'Content-type': 'application/json'
            },
            body: data
        });  //In res punem promisul ce vine de la fetch
        return await res.json();  //transforma raspunsul in json
    };

    function bindOostData(form) {  //Cream functia ce raspunde pentru postarea datelor, va primi in sine o forma  
        form.addEventListener('submit', (e) => {  //De fiecare data cand trimitem ceva date in forma  (e este obiectul evemnimentului)
            e.preventDefault();  //Pentru a anula comportamentul standart al browserului

            const statusMessage = document.createElement('img');  //Vom crea elementul img statusMessage
            statusMessage.src = message.loading;  //Ii adaugam atributul src 
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;  //Am adaugat stiluri la status message
            form.insertAdjacentElement('afterend', statusMessage); //folosim o comanda care va pune dupa forma status message

            const formData = new FormData(form);  //Cream obiectul formData care si transmitem ca argument forma care se transmite ca argument in postData

            const json = JSON.stringify(Object.fromEntries(formData.entries()));  //transformă obiectul formData într-un șir JSON pentru a-l putea utiliza ulterior pentru a trimite date către server sau pentru a fi stocat în altă parte sub formă de date JSON.




            postData('http://localhost:3000/requests', json)
            .then(data => {  //Folosim promisurile
                console.log(data); //Aratam la consola ceea ce ne returneaza serverul
                showThanksModal(message.success);  //chemam functia ShowThanksModal si trimitem mesajul success in forma
                statusMessage.remove();  //eliminam blocul status message de pe pagina
            }).catch(() => {
                showThanksModal(message.failure);  //daca ceva nu a mers bine transmitem failure prin functia showThanksModal
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {  //Cream functia ce va raspunde de aratarea unu mesaj de multumire
        const prevModalDialog = document.querySelector('.modal__dialog');  //Primim clasul modal__dialog

        prevModalDialog.classList.add('hide');  //Ii adaugam clasul hide care il va ascunde de pe pag
        openModal();  //Cand se ascunde prevModalDialog se porneste functia openModal

        const thanksModal = document.createElement('div');  //Cream un element div si il punem in variabila thanksModal
        thanksModal.classList.add('modal__dialog');  //Ii adaugam clasul modal__dialog
        thanksModal.innerHTML = `  
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;  //Adaugam content in blocul pe care l-am creat
        
        document.querySelector('.modal').append(thanksModal);  //Primim fereastra modal si folosim append care adauga textul 
        setTimeout(() => {  //Cream un setTimeout care va functiona dupa 4 sec
            thanksModal.remove();  //ascundem thanksModal pentru a intoarce inapoi prevModalDialog
            prevModalDialog.classList.add('show');  //aratam
            prevModalDialog.classList.remove('hide');  //ascundem
            closeModal();  //inchidem fereastra modal
        }, 4000);
    }

    //Slider

    const slides = document.querySelectorAll('.offer__slide'),  //primim sliderurile
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),  //primim arrow prev apoi next
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;  //returnează valoarea calculată pentru proprietatea width a elementului slidesWrapper
    
    let slideIndex = 1;  //index ce va arata pozitia actuala a sliderului
    let offset = 0;  //orientir sa vedem cu cat sa mutam cu ajutorul transform

    
    if(slides.length < 10) {  //daca avem mai putin de 10 slideuri adaugam un 0 in fata
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;  //daca nu, adaugam numarul actual al sliderului
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';  //setam latimea blocului
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
 
    slidesWrapper.style.overflow = 'hidden';  //ascundem toate elementele ce nu apar in zona de vizibilitate

    slides.forEach(slide => {
        slide.style.width = width;  //cu forEach trecem prin toate sliderurile si le setam aceeasi latime la toate
    });

    slider.style.position = 'relative';  //ii dam pozitie relativa la slider

    const indicators = document.createElement('ol'),  //cream un element nou ol list
          dots = [];  //cream array 
    indicators.classList.add('corousel-indicators');  //ii dam un clas nou 
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;  //ii adaugam stilurile prin interpolare la bloc
    slider.append(indicators);  //postam elementul in slider

    for(let i = 0; i < slides.length; i++) {  //printr-un for cream punctele care vor fi dupa numarul de slideuri
        const dot = document.createElement('li');  //cream anume elemente li
        dot.setAttribute('data-slide-to', i + 1);  //fiecarui punct ii atribuim data-slide-to si adaugam numerarea
        dot.style = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i == 0) {
            dot.style.opacity = 1;  //modificam opacity la punctul activ
        }
        indicators.append(dot);  //postam punctele in indicators
        dots.push(dot);  //cand se creaza punctele le bagam in arr
    };

    function deleteNotDigits(str) {
        return+str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (slides.length - 1)) {  //intai avem un string, apoi il convertim in number si ii taiem px
            offset = 0;
        } else {
            offset += deleteNotDigits(width);  //
        }

        slidesField.style.transform = `translateX(-${offset}px)`;  //mutam pe x slideul cat ne spune offsetul

        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else { 
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');  //initial fiecarui punct ii dam inline style opacity 0.5
        dots[slideIndex - 1].style.opacity = 1;  //scadem indexul la dots si ii dam opacity la 1 
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {  //intai avem un string, apoi il convertim in number si ii taiem px
            offset = deleteNotDigits(width) * (slides.length - 1) //intai avem un string, apoi il convertim in number si ii taiem px
        } else {
            offset -= deleteNotDigits(width);  //
        }

        slidesField.style.transform = `translateX(-${offset}px)`;  //mutam pe x slideul cat ne spune offsetul

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else { 
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');  //initial fiecarui punct ii dam inline style opacity 0.5
        dots[slideIndex - 1].style.opacity = 1;  //scadem indexul la dots si ii dam opacity la 1 
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {  //adaugam evenimentul click la puncte si folosim obiectul evenimentului
            const slideTo = e.target.getAttribute('data-slide-to');  //primim valoarea obiectului e dupa click

            slideIndex = slideTo;  //cand tastam un punct schimbam indexul la slideIndex
            offset = deleteNotDigits(width) * (slideTo - 1);  //calculam offsetul

            slidesField.style.transform = `translateX(-${offset}px)`;  //mutam pe x slideul cat ne spune offsetul
            dots.forEach(dot => dot.style.opacity = '.5');  //initial fiecarui punct ii dam inline style opacity 0.5
            dots[slideIndex - 1].style.opacity = 1;  //scadem indexul la dots si ii dam opacity la 1 

            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else { 
                current.textContent = slideIndex;
            }
        });
    });

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
}); 
