function forms() {
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
}

module.exports = forms;