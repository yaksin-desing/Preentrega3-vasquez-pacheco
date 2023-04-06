
LottieInteractivity.create({
    mode:"chain",
    player: "#logo",
    actions: [
        {
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
        if(link.classList.contains('small')){
            cursor.classList.remove('grow');
            cursor.classList.add('grow-small');
        }
    });
});


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
    return new Promise((done)=> {
        setTimeout(()=> {
            done();
        }, n);
    })
}

barba.init({
    sync: true,
    transitions: [
        {
            async leave(data){
                const done = this.async();
                pageTransition();
                await delay(1000);
                done();
            },

            async enter (data){
                mainAnimation();
            },

            async once(data){
                mainAnimation();
            }
        }
    ]
});
