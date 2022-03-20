let canvas = document.getElementById('canvas');
let button = document.querySelector('.start');

async function start() {
  let start = new Promise(function (성공, 실패) {
    button.addEventListener('click', function (e) {
      canvas.style.display = 'inline';
      this.style.display = 'none';
      성공();
    })
  })
  let 결과 = await start;
}

start();
let animate;
let 점프중 = false;
let 점프프레임카운트 = 0;
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
let dino = {
  x : 10,
  y : 200,
  width : 50,
  height : 50,
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
dino.draw();

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
let cactus = new Cactus();
cactus.draw();
let 타이머  = 0;
let cactuses = [];
function 프레임마다실행할거() {
  animate = requestAnimationFrame(프레임마다실행할거);
  타이머++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (타이머 % 200 === 0) {
    let cactus = new Cactus();
    cactuses.push(cactus);
    cactus.draw();
  }
  if (점프프레임카운트 >= 80) {
    점프중 = false;
    if (dino.y === 200) {
      점프프레임카운트 = 0;
    } else {
    dino.y+=2; }
  }
  if (점프중 === true) {
    점프프레임카운트++;
    dino.y-=2;
  }
  
  cactuses.forEach(function (item) {
    cactuses = cactuses.filter((element) => element.x >= 10);
    item.draw();
    item.x--;
    충돌하냐(dino, item);
  });
  dino.draw();
}
프레임마다실행할거();
function 충돌하냐(dino, cactus) {
  let crashedX = cactus.x - (dino.x + dino.width);
  let crashedY = cactus.y - (dino.y + dino.height);
  if (crashedX < 0 && crashedY < 0) {
    location.reload();
  }
}
document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    점프중 = true;
  }
})





