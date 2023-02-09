import View from "./view/index";
import Tournament from "./model/Tournament";
import User from "./model/User";
import Bot from "./model/Bot";

const user1 = new User("user1", "/assets/gryffindor.webp");
const bot1 = new Bot("Bot1", "/assets/hufflepuff.webp");

const view = new View();
const tournament = new Tournament(view, [user1, bot1], 4);

async function handleLoad() {
  view.onInit();
  await tournament.start();
}

function handleUnload() {
  view.onDestroy();
}

window.addEventListener("load", handleLoad, {
  once: true,
});

window.addEventListener("unload", handleUnload, {
  once: true,
});
