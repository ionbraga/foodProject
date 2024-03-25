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

    // getResource('http://localhost:3000/menu') 
    //     .then(data => {  //datele vin de pe server
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();  //acest metod se va repeta de atatea ori cate obiecte vor fi in masiv
    //         });
    //     }); 
    
    axios.get('http://localhost:3000/menu') 
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();  //acest metod se va repeta de atatea ori cate obiecte vor fi in masiv
            });
        });


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
          prev = document.querySelector('.offer__slider-prev'),  //primim arrow prev apoi next
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    let slideIndex = 1;  //index ce va arata pozitia actuala a sliderului

    showSlides(slideIndex);  //punem in functia showSlide variabila slideIndex ce contine indexul initial

    if(slides.length < 10) {  //daca avem mai putin de 10 slideuri adaugam un 0 in fata
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;  //daca nu, adaugam numarul actual al sliderului
    }

    function showSlides(n) {  //functie care arata sliderele ce primeste ca argument slideIndex;
        if(n > slides.length) {  
            slideIndex = 1;
        }

        if(n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');  //ascundem toate sliderurile 
        slides[slideIndex - 1].style.display = 'block';  //afisam sliderul actual si scadem 1 ca sa aratam pozitia corespunzatoara

        if(slides.length < 10) {  //daca avem mai putin de 10 slideuri adaugam un 0 in fata
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;  //daca nu, adaugam numarul actual al sliderului
        }

    };

    function plusSlides(n) {  //cream functia care va chema functia showSlides
        showSlides(slideIndex += n);   
    };

    prev.addEventListener('click', () => {  //eveniment pe buttonul prev
        plusSlides(-1);
    });

    next.addEventListener('click', () => {  //eveniment pe buttonul next
        plusSlides(+1);
    })

}); 
