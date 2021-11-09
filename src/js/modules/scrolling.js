const scrolling =(upSelector)=> {

    const upElem = document.querySelector(upSelector);

window.addEventListener('scroll', ()=> {
        if(document.documentElement.scrollTop > 1650) {
            console.log(1);

            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('animated', 'fadeOut');
            upElem.classList.remove('fadeIn');
        }      // сколько пролистали сверху

});
//Scrolling with raf

let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.7;



    links.forEach(link => {
        link.addEventListener('click', function(event){
            event.preventDefault();
            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;
                console.log(widthTop);
                console.log(hash);
                console.log(toBlock);

            requestAnimationFrame(step);

            function step(time) {
                console.log(time);
                let prev = performance.now();
                if(start === null) {
                    start = time;
                }
                console.log(start);
                let progress = time - start,
                
                r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock): Math.min(widthTop + progress/speed, widthTop + toBlock));
                console.log(progress);
                document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });



// Pure JS scrolling
// const element = document.documentElement,
//       body = document.body;



//     const calcScroll = () => {
//         upElem.addEventListener('click', function(event) {
//             let scrollTop = Math.round(body.scrollTop || element.scrollTop); // сколько пролистали сверху
//             console.log(scrollTop);

//             if (this.hash !== '') {
//                 event.preventDefault();
//                 let hashElement = document.getElementById(this.hash.substring(1)), // в адрес строке, то куда будем идти
//                     hashElementTop = 0;
//                     console.log(hashElement)

//                 while (hashElement.offsetParent) {
//                     hashElementTop += hashElement.offsetTop;
//                     hashElement = hashElement.offsetParent;
//                     console.log('ddd');
//                     console.log(hashElement)

//                 }

//                 hashElementTop = Math.round(hashElementTop);
//                 console.log(hashElementTop);


//                 smoothScroll(scrollTop, hashElementTop, this.hash);

//             }
//         });
//     };

//     const smoothScroll = (from, to, hash) => {
//         let timeInterval = 1,
//             prevScrollTop,
//             speed;


//         if (to > from) {
//             speed = 10;
//         } else {
//             speed = -10;
//         }

//         let move = setInterval(function() {
//             let scrollTop = Math.round(body.scrollTop || element.scrollTop);

//             if (
//                 prevScrollTop === scrollTop ||
//                 (to > from && scrollTop >= to) ||
//                 (to < from && scrollTop <= to)
//             ) {
//                 clearInterval(move);
//                 history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
//             } else {
//                 body.scrollTop += speed;
//                 element.scrollTop += speed;
//                 prevScrollTop = scrollTop;
//             }
//         }, timeInterval);
//     };
//     calcScroll();
};


export default scrolling;