// public/js/notes/notes.js
import { checkOpenBoxMenu } from "../boxes/boxes.js";

export let openNoteMenu = null;

export function toggleNoteMenuVis(id, event) {
  event.stopPropagation();

  const noteMenu = document.querySelector(
    `.noteMenuBtns[data-note-id="${id}"]`,
  );

  checkOpenBoxMenu();

  const isCollapsed = noteMenu.classList.contains("collapsed");

  if (openNoteMenu && openNoteMenu !== noteMenu) {
    openNoteMenu.classList.add("collapsed");
  }

  if (isCollapsed) {
    noteMenu.classList.remove("collapsed");
    openNoteMenu = noteMenu;
  } else {
    noteMenu.classList.add("collapsed");
    openNoteMenu = null;
  }
}

export function checkOpenNoteMenu() {
  if (openNoteMenu) {
    openNoteMenu.classList.add("collapsed");
    openNoteMenu = null;
  }
}

export function expandNoteBody(id, button) {
  const noteBody = document.querySelector(`.noteBody[data-note-id="${id}"]`);
  const collapseBtn = document.querySelector(
    `.collapseNoteBtn[data-note-id="${id}"]`,
  );

  if (!noteBody || !collapseBtn) return;

  noteBody.classList.remove("collapsed");
  collapseBtn.classList.remove("collapsed");
  button.classList.add("collapsed");
}

export function collapseNoteBody(id, button) {
  const noteBody = document.querySelector(`.noteBody[data-note-id="${id}"]`);
  const expandBtn = document.querySelector(
    `.expandNoteBtn[data-note-id="${id}"]`,
  );

  if (!noteBody || !expandBtn) return;

  noteBody.classList.add("collapsed");
  expandBtn.classList.remove("collapsed");
  button.classList.add("collapsed");
}

export function editNoteOrder(id, order) {
  const moveArrows = document.querySelector(
    `.noteOrderBtns[data-note-id="${id}"]`,
  );
  moveArrows.classList.toggle("collapsed");
}
