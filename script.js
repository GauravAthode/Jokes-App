let lang = "hi";
let category = "general";
let dark = false;

window.onload = () => {
  getJoke();
};

function setLang(l) {
  lang = l;

  document.getElementById("hiBtn").className =
    l === "hi" ? "btn btn-warning active" : "btn btn-outline-warning";
  document.getElementById("enBtn").className =
    l === "en" ? "btn btn-warning active" : "btn btn-outline-warning";

  document.getElementById("categoryBox").classList.toggle("d-none", l !== "en");
  getJoke();
}

function setCategory(c) {
  category = c;
  getJoke();
}

async function getJoke() {
  const setup = document.getElementById("setup");
  const punchline = document.getElementById("punchline");
  const mood = document.getElementById("mood");

  setup.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
  punchline.innerText = "";
  mood.innerText = "😐";

  try {
    if (lang === "hi") {
      const res = await fetch("https://v2.jokeapi.dev/joke/Any?lang=hi");
      const data = await res.json();

      if (data.error) {
        setup.innerText = "Hindi joke available nahi hai 😢";
        mood.innerText = "❌";
        return;
      }

      if (data.type === "single") {
        setup.innerText = data.joke;
      } else {
        setup.innerText = data.setup;
        setTimeout(() => {
          punchline.innerText = data.delivery;
        }, 1200);
      }

      mood.innerText = "😂";
    } else {
      const res = await fetch(
        `https://official-joke-api.appspot.com/jokes/${category}/random`
      );
      const data = await res.json();

      setup.innerText = data[0].setup;
      setTimeout(() => {
        punchline.innerText = data[0].punchline;
        mood.innerText = "😂";
      }, 1200);
    }
  } catch {
    setup.innerText = "Joke load nahi hua 😢";
    punchline.innerText = "";
    mood.innerText = "❌";
  }
}

function toggleDark() {
  dark = !dark;

  document.getElementById("body").className = dark
    ? "bg-dark text-light"
    : "bg-light text-dark";

  document.getElementById("card").className = dark
    ? "card bg-secondary text-light shadow-lg rounded-4"
    : "card shadow-lg rounded-4";
}
