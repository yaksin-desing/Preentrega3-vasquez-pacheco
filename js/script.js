var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor-scale'),
    mouseX = 0,
    mouseY = 0

gsap.to({}, 0.050, {
    repeat: -1,
    onRepeat: function () {
        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        })
    }
});

window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY
});

cursorScale.forEach(link => {
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('grow');
        cursor.classList.remove('grow-small');
    });
    link.addEventListener('mousemove', () => {
        cursor.classList.add('grow');
        if (link.classList.contains('small')) {
            cursor.classList.remove('grow');
            cursor.classList.add('grow-small');
        }
    });
});


LottieInteractivity.create({
    mode: "chain",
    player: "#logo",
    actions: [{
            state: 'autoplay',
            transition: 'onComplete',
            frames: [1, 148],

        },
        {
            type: 'hover',
            frames: [147],
        }
    ]
});


const iconoMenu = document.querySelector('.icono-menu'),
    menu = document.querySelector('.cont-menu');
iconoMenu.addEventListener('click', (e) => {
    menu.classList.toggle('active');
    document.body.classList.toggle('opacity');
    const rutaActual = e.target.getAttribute('src');
    if (rutaActual == '../assets/img/menu1.svg' || rutaActual == 'assets/img/menu1.svg') {
        e.target.setAttribute('src', '../assets/img/menu2.svg');

    } else {
        e.target.setAttribute('src', '../assets/img/menu1.svg');

    }
});

// animacion barba.js//

pageTransition = () => {
    var timeline = gsap.timeline();

    timeline.to("header", {
        zIndex: 1
    });

    timeline.to(".page-transition", {
        duration: .2,
        height: "120%",
        button: "100%",

    });
    timeline.to(".pages-transition", {
        duration: .2,
        height: "120%",
        button: "100%",
    });
    timeline.to(".pages-transition", {
        duration: .3,
        height: "0%",
        button: "0%",
        delay: .1,
        yoyo: true

    });
    timeline.to(".page-transition", {
        duration: .4,
        height: "0%",
        button: "0%",
        delay: .1,
        yoyo: true

    });

    timeline.set(".page-transition", {
        button: "-100%"
    });
}

mainAnimation = () => {
    var timeline = gsap.timeline();

    timeline.from(".container", {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: {
            amount: .4
        },
        delay: .8
    });
}

delay = (n) => {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    })
}



// barba.init({
//     sync: true,
//     transitions: [{
//         async leave(data) {
//             const done = this.async();
//             pageTransition();
//             await delay(1000);
//             done();
//         },
//         async enter(data) {
//             mainAnimation();
//         },
//         async once(data) {
//             mainAnimation();
//         }
//     }],
// });

// despues de transicion
barba.hooks.afterLeave((data) => {
    let triggers = ScrollTrigger.getAll();
    triggers.forEach( trigger => { 
        trigger.kill();
    });
});
// restablecer despues de transicion
barba.hooks.enter((data) => {
window.scrollTo(0, 0);
ScrollTrigger.refresh(true);
});
// reiniciar funciones despues de transicion
barba.hooks.afterEnter((data) => {
// console.log(data.next.namespace);
// var x = data.next.namespace;
reInitialized();
});