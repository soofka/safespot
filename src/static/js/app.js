initApp();

async function initApp() {
  let routes = {};
  try {
    const response = await fetch("/routes.json");
    routes = await response.json();
  } catch (error) {
    throwError(error);
  }

  for (let route in routes) {
    if (
      route ===
      (window.location.pathname.endsWith("/") &&
      window.location.pathname !== "/"
        ? window.location.pathname.substring(
            0,
            window.location.pathname.length - 1
          )
        : window.location.pathname)
    ) {
      displayPage(routes[route]);
      return;
    }
  }

  throwError(
    `Nie znaleziono strony <strong>${window.location.pathname}</strong>.`
  );
}

async function displayPage(route) {
  let aActive;
  for (let a of Array.from(document.querySelectorAll("#menu a"))) {
    a.classList.remove("active");
    if (
      a.getAttribute("href") === window.location.pathname ||
      `${a.getAttribute("href")}/` === window.location.pathname
    ) {
      aActive = a;
    }
  }
  try {
    const response = await fetch(route);
    const content = await response.text();
    updateMain(content);
    if (aActive) {
      aActive.classList.add("active");
    }
  } catch (error) {
    throwError(error);
  }
}

function throwError(error) {
  console.error(error);
  updateMain(
    `<section><div class="wrapper"><article><h1>Wystąpił błąd</h1><p>${
      error.message || error
    }</p><h3><a href="javascript:window.location.reload()">Odśwież przeglądarkę</a> lub <a href="/">wróć do strony głównej</a>.</p></article></div></section>`
  );
}

function updateMain(content) {
  document.querySelector("main").innerHTML = content;
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("header").classList.add("slide-in-top");
  document.querySelector("main").classList.add("slide-in-bottom");
  document.querySelector("footer").classList.add("slide-in-bottom");
  document.querySelector(".cover").remove();
});
