const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
          burgerElem = document.querySelector(burgerSelector);

          if(window.screen.availWidth > 993) {
            burgerElem.style.display = 'none'
        } else {
            burgerElem.style.display = 'block';
        }

        menuElem.style.display = 'none';
        burgerElem.addEventListener('click', ()=> {
            if(menuElem.style.display == "none" && window.screen.availWidth < 993) { // Ширина без скрола, чисто контент сайта
                menuElem.style.display = 'block';
            } else {
                menuElem.style.display = 'none';

            }
        });


        window.addEventListener('resize', ()=> {
            if(window.screen.availWidth > 993) {
                menuElem.style.display = 'none';
                burgerElem.style.display = 'none';
            } else {
                burgerElem.style.display = 'block';
            }
            

        }); // Отслеживает когда пользователь изменяет размер экрана
    };

export default burger;