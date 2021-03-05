let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');
let scr = document.getElementById('score');
let ground = document.querySelector('.ground');
let groundHeight = parseInt(getComputedStyle(ground).getPropertyValue('top'));
let lose = document.querySelector('.lose');
let restart = document.querySelector('.restart');



ground.style.backgroundColor = 'slateblue'

//changing basket color for collect coin

window.addEventListener('click', () => {
   if (ground.style.backgroundColor === 'slateblue') {
       ground.style.backgroundColor = 'red';
   } else if (ground.style.backgroundColor === 'red') {
       ground.style.backgroundColor = 'slateblue';
   }
});

let redCoin = new Image();
let greenCoin = new Image();

const randomForCoin = [greenCoin, redCoin];

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
    create: true,
    texture: greenCoin,
}

//coin size

let coinSize = 50;

//score

let score = 0;

function randomCoin(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function draw() {
    //clear
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    for (let i = 0; i < newcoin.length; i++) {

        //draw coin
        ctx.drawImage(newcoin[i].texture, newcoin[i].x, newcoin[i].y, coinSize, coinSize);
        newcoin[i].y += 4;

        //adding new coin
        if (newcoin[i].y >= 100 && newcoin[i].create === true) {
            newcoin.push({
                x: Math.floor(Math.random() * window.innerWidth),
                y: -30,
                create: true,
                texture: randomCoin(randomForCoin),
            })
            newcoin[i].create = false;
        }

        //get img.source
        let imageSource = newcoin[i].texture.src.slice(newcoin[i].texture.src.indexOf('img') + 4);

        //check collision
        if (newcoin[i].y > groundHeight - 30) {
            if (ground.style.backgroundColor === 'slateblue' && imageSource === 'fruit.png') {
                newcoin.splice(newcoin[i], 1);
                score++;
            } else if ((ground.style.backgroundColor === 'slateblue'
                && imageSource === 'fruit2.png')) {
                lose.style.display = 'flex';
                restart.addEventListener('click', () => {
                    location.href = 'play.html';
                });
                return;
            }
            if (ground.style.backgroundColor === 'red'
                && imageSource === 'fruit2.png') {
                newcoin.splice(newcoin[i], 1);
                score++;
            } else if ((ground.style.backgroundColor === 'red'
                && imageSource === 'fruit.png')) {
                lose.style.display = 'flex';
                restart.addEventListener('click', () => {
                    location.href = 'play.html';
                });
                return;
            }
        }
    }

    ctx.fillStyle = '#000'
    ctx.font = '36px Verdana'
    scr.innerHTML = `Score: ${score}`;

    requestAnimationFrame(draw);
}

greenCoin.src = 'img/fruit.png';
redCoin.src = 'img/fruit2.png';