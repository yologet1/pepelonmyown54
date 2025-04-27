const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let raindrops = [];
let mouseX = 0;
let mouseY = 0;

// Отслеживаем движение мыши
window.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// При изменении размера окна
window.addEventListener('resize', function() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Создание капель
function createDrop() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    speedY: Math.random() * 5 + 5,
    speedX: (Math.random() - 0.5) * 2,
    length: Math.random() * 15 + 10,
  };
}

// Массив капель
for (let i = 0; i < 300; i++) {
  raindrops.push(createDrop());
}

// Рисование дождя
function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'; // Чёрные капли
  ctx.lineWidth = 1.5;

  for (let drop of raindrops) {
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x + drop.speedX * 2, drop.y + drop.length);
    ctx.stroke();
    
    // Движение капель в сторону мыши
    drop.x += (mouseX - width/2) * 0.0005 * drop.speedY;
    drop.y += drop.speedY;

    // Перезапуск капель сверху
    if (drop.y > height) {
      drop.x = Math.random() * width;
      drop.y = -20;
    }
  }
  requestAnimationFrame(draw);
}

draw();

// Запускаем музыку в фоне
const music = document.getElementById('background-music');
music.volume = 0.3; // Тише звук
