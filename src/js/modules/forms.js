import { postData } from "../services/requests";

// import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');
    const price = document.querySelector('.calc-price');



        // checkNumInputs('input[name="user_phone"]');


    
    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };



    const clearInputs = () => {
        input.forEach(item => {
            item.value = ''; // Очищаем инпуты
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран'; // Очищаем также и аплоад
        });
    };

    upload.forEach((item => {
        item.addEventListener('input', ()=> {
            console.log(item.files[0]); // обращаемся к фалу встроенный объект
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots ='...' : dots = '.'; // Массив в котором будет два элемента до точки и после
            const name = arr[0].substring(0, 6) + dots + arr[1]; // Слепили первую часть массива + переменную точки + вторую часть массива4

            item.previousElementSibling.textContent = name; //предыдущий элемент

        }); // Сработает, когда пользователь что-то положит в поле
    }));

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage); // помещаем в родителя


            item.classList.add('animated', 'fadeOutUp'); // Скрываем форму классами из анимета
            setTimeout(() => {
                item.style.display = 'none'
            }, 400); // Скрыли физически форму

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner); // Создаем атрибут для тега img
            statusImg.classList.add('animated', 'fageInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item); // соберет объект из данных формы
            if (item.getAttribute('atr')=== 'end') { // Добавили все данные из свитча, в котором мы собирали данные о заказе пользователя
                for (let key in state) { // Перебираем объект в JS
                    formData.append(key, state[key]); // Метод добавления в обхект новых ключей
                }
                console.log(...formData);

        }
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question // Попробует найти определенный блок по селектору если вернет true, тогда будем брать путь до определенного файла
            console.log(api);

            // const clearState = () => {
            //     for (let key in state) {
            //         switch(key) {
            //             case 'height':
            //                 state.height = 0;
            //             case 'width':
            //                 state.width = 0;
            //             case 'type':
            //                 state.type = "tree";
            //             case 'form':
            //                 state.form = 0;
            //             case 'profile':
            //                 delete state.profile;
            //         }
            //         // delete state[key];
            //         }
            // };

            // const hideModal = () => {
            //   const modalEnd =  document.querySelector('.popup_calc_end');
            //     modalEnd.style.display = 'none';
            //     document.body.classList.remove('modal-open');
            // }



            postData(api, formData) // Здесь в пути будет переменная
            .then(res => {
                console.log(res);
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent = message.success;
            })
            .catch(() => {
                statusImg.setAttribute('src', message.fail);
                textMessage.textContent = message.failure;
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                }, 2000);


            });
        });

        }); // submitim formu


};

export default forms;



// function flickSwitch(array) {
//     let newArr = [];
//     let switc = true;
//     array.forEach((item) => {
//         if(item === 'flick') {
//             switc = !switc;
            
//         }
//         newArr.push(switc);

//     });
//     console.log(newArr);
// }


// flickSwitch(["edabit", "flick", "eda", "bit"]);
// flickSwitch(["flick", 11037, 3.14, 53]);
// flickSwitch([false, false, "flick", "sheep", "flick"]);