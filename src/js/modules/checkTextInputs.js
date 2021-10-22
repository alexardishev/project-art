const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);


    txtInputs.forEach(input => {
        input.addEventListener('keypress', function(e){
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }


        });

        input.addEventListener('blur', ()=> {
            let val = input.value;
            console.log(typeof(val));
            console.log(val.match(/[a-z]/ig));
            if (val.match(/[a-z]/ig)) {
                input.value = '';
            }
        });

        
        input.addEventListener('input', ()=> {
            let val = input.value;
            console.log(typeof(val));
            console.log(val.match(/[a-z]/ig));
            if (val.match(/[a-z]/ig)) {
                input.value = '';
            }
        });
    });
};

export default checkTextInputs;


// let str = 'fdkfdlfkdlfk';
// let regExp = /[a-z]/ig;

// console.log(str.match(regExp));