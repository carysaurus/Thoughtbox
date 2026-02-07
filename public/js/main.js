// public/js/main.js
import { expandNewBoxForm, collapseNewBoxForm } from "./buttons.js";
import { updateToast } from "./toast.js";

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

  if (window.toastMessage) {
    updateToast(window.toastMessage);
  }

  feather.replace();
});

document.addEventListener("click", () => {
  checkOpenBoxMenu();
  checkOpenNoteMenu();
});
