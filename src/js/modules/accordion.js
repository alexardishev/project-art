const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function(){
            hideBlock();
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if (this.classList.contains('active-style')) {
                
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });

        function hideBlock () {
            btns.forEach((btn, i) => {
                const nextElem = btn.nextElementSibling;
                btn.classList.remove('active-style');
                nextElem.classList.remove('active-content');
                nextElem.style.maxHeight ='0px';
            });
        };
    });



        //   blocks = document.querySelectorAll(itemsSelector);

    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown');
    // });

    // btns.forEach(btn => {
    //     btn.addEventListener('click', function(){
    //         if(!this.classList.contains('active')){ // Если нет класса активности
    //             btns.forEach(btn => {
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });


};

// function progress (days, price) {
//     let pre = price * 2;

//     for (let i = 0; i < days; i++) {

//         pre += pre;
//         // let pred = price * i;
//         // res += price + price;
//         console.log(pre);
//     }

// }

// progress(27, 3);

// function pow (num, pow) {
//     let res = 1;
//     for(let i =0; i < pow; i++) {
//         res *= num;
//         console.log(res);
//     }
// }

// pow(3, 2);


export default accordion;





