function slider() {
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
}

module.exports = slider;