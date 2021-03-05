let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');
let scr = document.getElementById('score');

let ground = document.querySelector('.ground');

ground.style.backgroundColor = 'green'

//changing basket color for collect coin

window.addEventListener('click', () => {
   if (ground.style.backgroundColor === 'green') {
       ground.style.backgroundColor = 'black';
   } else if (ground.style.backgroundColor === 'black') {
       ground.style.backgroundColor = 'green';
   }
});

let redCoin = new Image();
let greenCoin = new Image();

//Responsive Canvas
window.onload = function(){
    init();
    window.addEventListener('resize', init, false);

}

function init() {
    cvs.style.display = 'none';

    cvs.width = window.innerWidth * 2;
    cvs.height = window.innerHeight * 2;
    cvs.style.width = window.innerWidth + "px";
    cvs.style.height = window.innerHeight + "px";
    ctx.scale(2, 2);

    cvs.style.display = 'block';
}

greenCoin.onload = draw; // callback, need to initialization before initializoation src(image)

//creating first coin

let newcoin = [];

newcoin[0] = {
    x: Math.floor(Math.random() * window.innerWidth),
    y: 0,
    create: true
}

let newcoin2 = [];

newcoin2[0] = {
    x: Math.floor(Math.random() * window.innerWidth),
    y: 0,
    create: true
}

//coin size

let coinSize = 50;

//score

let score = 0;

function draw() {
    //clear
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    for (let i = 0; i < newcoin.length; i++) {
        //draw coin

        ctx.drawImage(greenCoin, newcoin[i].x, newcoin[i].y, coinSize, coinSize);
        newcoin[i].y += 4;

        if (newcoin[i].y >= 100 && newcoin[i].create === true) {
            newcoin.push({
                x: Math.floor(Math.random() * window.innerWidth),
                y: -30,
                create: true
            })
            newcoin[i].create = false;
        }
    }


        // for (let i = 0; i < newcoin2.length; i++) {
        //     //draw coin
        //
        //     ctx.drawImage(redCoin, newcoin2[i].x, newcoin2[i].y, coinSize, coinSize);
        //     newcoin2[i].y += 4;
        //
        //     if (newcoin2[i].y >= 100 && newcoin2[i].create === true) {
        //         newcoin2.push({
        //             x: Math.floor(Math.random() * window.innerWidth),
        //             y: -30,
        //             create: true
        //         })
        //         newcoin2[i].create = false;
        //     }
        // }



    ctx.fillStyle = '#000'
    ctx.font = '36px Verdana'
    scr.innerHTML = `Score: ${score}`;

    requestAnimationFrame(draw);
}

console.log(cvs.width);
console.log(cvs.height);

greenCoin.src = 'img/coin.png';
redCoin.src = 'img/rubin.jpg';