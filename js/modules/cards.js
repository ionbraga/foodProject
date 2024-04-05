function cards() {
    
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

}

module.exports = cards;