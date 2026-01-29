// public/js/notes/editNote.js
let setNoteType = null;
let imgSrc = "";

// --------------------------------------
// Note Form DOM Elements
// --------------------------------------
const noteFormWindow = document.getElementById("noteFormWindow");
const noteContentForm = document.getElementById("noteContentForm");
const noteTypeForm = document.getElementById("noteTypeForm");

const noteReturnBtn = document.getElementById("returnTypeBtn");

// Required Fields
const noteFormTitle = document.getElementById("noteFormTitle");
const noteBoxId = document.getElementById("noteBoxId");
const noteType = document.getElementById("noteType");
const noteTitleValue = document.getElementById("noteTitle");
const noteColourValue = document.getElementById("noteColour");

// Type-specific fields
const noteTextValue = document.getElementById("noteText");
const noteImageInput = document.getElementById("noteImageInput");
const noteImgSrc = document.getElementById("noteImgSrc");
const noteimgDesc = document.getElementById("noteImgDesc");
const imagePreview = document.getElementById("previewImgHere");

// Optional fields
const noteTags = document.getElementById("noteTags");

// --------------------------------------
// Load/Close Note Forms
// --------------------------------------
export function loadNoteTypeForm() {
  noteFormWindow.classList.remove("collapsed");
  noteTypeForm.classList.remove("collapsed");
  noteContentForm.classList.add("collapsed");
}
export function loadNoteContentForm() {
  noteFormWindow.classList.remove("collapsed");
  noteTypeForm.classList.add("collapsed");
  noteContentForm.classList.remove("collapsed");
}
export function closeNoteFormWindow() {
  noteFormWindow.classList.add("collapsed");
  noteTypeForm.classList.add("collapsed");
  noteContentForm.classList.add("collapsed");
  resetNoteForm();
}

// --------------------------------------
// Note Types
// --------------------------------------
export function setTextNote() {
  setNoteType = "text";
  noteType.value = setNoteType;
  noteTextValue.classList.remove("collapsed");
  noteTextValue.required = true;

  loadNoteContentForm();
}

export function setImageNote() {
  setNoteType = "image";
  noteType.value = setNoteType;
  noteImageInput.classList.remove("collapsed");
  noteImgSrc.required = true;

  loadNoteContentForm();
}

export function loadNoteImagePreview() {
  imgSrc = noteImgSrc.value;
  imagePreview.setAttribute("src", imgSrc);
}

// --------------------------------------
// Edit Exisiting Note
// --------------------------------------
export function setEditNoteMode(note) {
  // Update Form Action
  noteContentForm.setAttribute("action", `/notes/edit/${note._id}?_method=PUT`);

  noteFormTitle.textContent = "Update Thought";
  noteReturnBtn.style.display = "none";

  // Populate hidden fields
  noteBoxId.value = note.boxId;
  noteType.value = note.type;

  // Populate visible fields
  noteTitleValue.value = note.title;
  noteColourValue.value = note.colour;
  noteTextValue.value = note.text;
  noteImgSrc.value = note.image.src;
  noteImgDesc.value = note.image.desc;
  noteTags.value = note.tags;

  loadNoteImagePreview();

  // Show input based on note type
  if (note.type === "text") {
    setTextNote();
  }
  if (note.type === "image") {
    setImageNote();
  }
}

// --------------------------------------
// Note Form Resets
// --------------------------------------
export function resetNoteForm() {
  noteContentForm.setAttribute("action", "/notes");

  noteBoxId.value = "";
  noteType.value = "";
  noteFormTitle.textContent = "Create Thought";
  noteTitleValue.value = "";
  noteColourValue.value = "";
  noteTags.value = "";
  resetNoteType();
}

export function resetNoteType() {
  setNoteType = null;

  noteTextValue.required = false;
  noteTextValue.value = "";
  noteTextValue.classList.add("collapsed");

  noteImgSrc.required = false;
  noteImgSrc.value = "";
  noteImgDesc.value = "";
  imagePreview.removeAttribute("src", imgSrc);
  noteImageInput.classList.add("collapsed");
}
