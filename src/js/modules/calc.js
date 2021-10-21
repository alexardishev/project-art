const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result),
          headBlock = document.querySelector('.calc_form');


    let sum = 0;

    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value * +materialBlock.value) + (+optionsBlock.value));

        if(sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберете размер и материал картины";
        } else if(promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    };

    const stateFunc = () => {
        
        headBlock.addEventListener('click', (e)=>{
            const event = e.target;
            const totalPrice = document.querySelector('.calc-price').textContent;
            console.dir(event);
            switch(event.id) {
                case 'size':
                    if(+sizeBlock.value == 500) {
                        state.size = '40x50';
                        console.log(event.nodeName);
                    }
                    if(+sizeBlock.value == 1000) {
                        state.size = '50x70';
                    }
                    if(+sizeBlock.value == 1500) {
                        state.size = '70x70';
                    }
                    if(+sizeBlock.value == 2000) {
                        state.size = '70x100';
                    }
                    state.totalPrice = totalPrice;


                case 'material':
                    if(+materialBlock.value == 1) {
                        state.material = 'Холст из волокна';
                    }
                    if(+materialBlock.value == 1.2) {
                        state.material = 'Льняной холст';
                    }
                    if(+materialBlock.value == 1.5) {
                        state.material = 'Холст из натурального хлопка';
                    }
                    state.totalPrice = totalPrice;
                case 'options':
                    if(+optionsBlock.value == 0) {
                        state.options = '';
                    }
                    if(+optionsBlock.value == 1000) {
                        state.options = 'Покрытие арт-гелем';
                    }
                    if(+optionsBlock.value == 2000) {
                        state.options = 'Экспресс-изготовление';
                    }
                    if(+optionsBlock.value == 500) {
                        state.options = 'Доставка готовых работ';
                    }
                    state.totalPrice = totalPrice;

            }
            switch(event.nodeName) {
                case "INPUT":
                    const promic = document.querySelector('.promocode');
                    promic.addEventListener('input', ()=>{
                        state.promo = promic.value;
                        console.log(state);

                    });
                    state.totalPrice = totalPrice;
            }
            

            console.log(state);

        });

    }
    console.log(state);
    stateFunc();

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;