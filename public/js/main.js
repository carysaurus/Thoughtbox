// public/js/main.js
import { expandNewBoxForm, collapseNewBoxForm } from "./buttons.js";

import { checkOpenBoxMenu } from "./boxes/boxes.js";
import {
  checkOpenNoteMenu,
  expandNoteBody,
  collapseNoteBody,
} from "./notes/notes.js";

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = document.body.dataset.loggedIn === "true";

  const authWindow = document.getElementById("authWindow");
  if (isLoggedIn) {
    authWindow.style.display = "none";
  } else {
    authWindow.style.display = "flex";
  }

  feather.replace();
});

document.addEventListener("click", () => {
  checkOpenBoxMenu();
  checkOpenNoteMenu();
});
