document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".buttons a");

  buttons.forEach(button => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Останавливаем мгновенный переход

      if (!this.classList.contains("loading")) {
        this.classList.add("loading");

        // Добавляем спиннер
        let spinner = document.createElement("div");
        spinner.classList.add("spinner");
        this.appendChild(spinner);
        spinner.style.display = "block";

        setTimeout(() => {
          window.location.href = this.href; // Переход по ссылке после задержки
        }, 1500);
      }
    });
  });
});

