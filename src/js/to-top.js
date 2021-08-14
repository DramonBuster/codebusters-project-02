function scrollTo(to, duration = 700) {
    const
        element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),
        // t = current time
        // b = start value
        // c = change in value
        // d = duration
        easeInOutQuad = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        animateScroll = function() {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                element.scrollTop = to;
            }
        };
    animateScroll();
}
    let btn = document.querySelector('#toTop');
    console.log(btn, `btnq`)
document.addEventListener('DOMContentLoaded', function() {

    window.addEventListener('scroll', function() {
        // Если прокрутили дальше 599px, показываем кнопку
        if (pageYOffset > 100) {
            btn.classList.add('show');
            // Иначе прячем
        } else {
            btn.classList.remove('show');
        }
    });

    // При клике прокручиываем на самый верх
    btn.onclick = function(click) {
        click.preventDefault();
        scrollTo(0, 700);
    }
});
console.log(`HELLO`)
// window.onload = () => {
//     window.onscroll = function(e) {
//         let winY  = window.scrollY;
//         if(winY > 300) {
//             progressBar()
//             scrollBarAnimation()

//             winY = null;
//         }
//     }

//     window.onscroll = function(e) {
//           if(window.dcrollY > 700) {
//             const a =  document.querySelector('.is-ShowBtn').classList.remove('.is-ShowBtn_hide');
//               console.log(a)
//             // progressBar()
//             // scrollBarAnimation()

//             winY = null;
//         }

//     }
// }