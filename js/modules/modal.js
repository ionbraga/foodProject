
function openModal(modalSelector, modalTimerId) {  //cand functia se cheama ea va lucra cu selectorul 
    const modal = document.querySelector(modalSelector);  //primim fereastra modal
    modal.classList.add('show');  //se adauga show la fereastra modal 
    modal.classList.remove('hide');  //se scoade hide 
    document.body.style.overflow = 'hidden';  //nu putem face scroll
    console.log(modalTimerId);
    if(modalTimerId) {
        clearInterval(modalTimerId);  //daca utilizatorul a privit singur deja fereastra modal atunci anulam pornirea automata
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);  //primim fereastra modal
    modal.classList.add('hide');  //se adauga hide la fereastra modal 
    modal.classList.remove('show');  //se scoade show
    document.body.style.overflow = ''; //pornim inapoi scrollul
}


function modal(triggerSelector, modalSelector, modalTimerId) {
        const modalTrigger = document.querySelectorAll(triggerSelector),  //primim buttoanele de aratare a ferestrei modal
        modal = document.querySelector(modalSelector);  //primim fereastra modal


  modalTrigger.forEach(btn => {  //pentru a lucra cu pseudomasivul modalTrigger
      btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });


  modal.addEventListener('click', (e) => {  //evenimentul click pe modal si folosim obiectul evenimentului - "e"
      if(e.target === modal || e.target.getAttribute('data-close') == '') {  //daca locul unde tasteaza utilizatorul este egal cu modal, adica nu pe modal-dialog
         closeModal(modalSelector);  //chemam functia closeModal
      }
  });

  document.addEventListener('keydown', (e) => {  //tastarea de la tastatura
      if(e.code === 'Escape' && modal.classList.contains('show')) {  //daca e(obiectul evenimentului) este egala cu tasta escape(daca noi am tastat esc) si daca fereastra modal este desschisa
          closeModal(modalSelector);  //chemam functia closeModal
      }
  });

  function showModalByScroll() {  //cream functia ce va arata fereastra modal dupa ce ajungem la sfarsitul paginii
      if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {  //daca distanța de la partea de sus a viewport-ului până la partea de jos a viewport-ului este egala cu înălțimea totală a întregului document
          openModal(modalSelector, modalTimerId); 
          window.removeEventListener('scroll', showModalByScroll);  //dupa ce a fost deschisa prima data fereastra modal, se sterge eventListenerul ce a deschis fereastra
      }
  }

  window.addEventListener('scroll', showModalByScroll);  //adaugam eveniment odata ce am ajut la sfarsit de pag

}
export default modal;
export {closeModal};
export{openModal};