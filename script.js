document.addEventListener("DOMContentLoaded", function () {

  // Скрипт дождя
  const canvas = document.getElementById('rain');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let raindrops = [];
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('resize', function() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function createDrop() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      speedY: Math.random() * 5 + 5,
      speedX: (Math.random() - 0.5) * 2,
      length: Math.random() * 15 + 10,
    };
  }

  for (let i = 0; i < 300; i++) {
    raindrops.push(createDrop());
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.lineWidth = 1.5;

    for (let drop of raindrops) {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x + drop.speedX * 2, drop.y + drop.length);
      ctx.stroke();

      drop.x += (mouseX - width/2) * 0.0005 * drop.speedY;
      drop.y += drop.speedY;

      if (drop.y > height) {
        drop.x = Math.random() * width;
        drop.y = -20;
      }
    }
    requestAnimationFrame(draw);
  }

  draw();

  // Авто-музыка
  const music = document.getElementById('background-music');
  if (music) {
    music.volume = 0.3;
  }

  // Скрипт кнопок со спиннером
  const buttons = document.querySelectorAll(".buttons a");

  buttons.forEach(button => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); 

      if (!this.classList.contains("loading")) {
        this.classList.add("loading");

        let spinner = document.createElement("div");
        spinner.classList.add("spinner");
        this.appendChild(spinner);
        spinner.style.display = "inline-block";

        setTimeout(() => {
          window.location.href = this.href;
        }, 1500);
      }
    });
  });

});
