// import checkNumInputs from './checkNumInputs';

const forms = () => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');



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

    const postData = async (url, data) => {
        let res = await fetch(url, { // если использую запрос, то он асинхрон и об этом надо писать 
            method: "POST",
            body: data
        });

        return await res.text();
    };  

    const clearInputs = () => {
        input.forEach(item => {
            item.value = ''; // Очищаем инпуты
        });
    };

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
            let api;
            item.closest('.popup-design') ? api = path.designer : api = path.question // Попробует найти определенный блок по селектору если вернет true, тогда будем брать путь до определенного файла
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

            console.log(formData)
            console.log(JSON.stringify(formData));

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