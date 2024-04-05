function modal() {
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

}

module.exports = modal;