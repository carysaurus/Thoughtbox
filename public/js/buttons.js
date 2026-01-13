// buttons.js
import {
    setEditNoteMode
} from "./notes/editNote.js";

let currentBoxId = null;
let setNoteType = null;
let currentBoxColour = null;


// --------------------------------------
// Create New Box Buttons
// --------------------------------------
const newBoxForm = document.getElementById('newBoxForm');
const expandNewBoxBtn = document.getElementById('expandNewBoxBtn');
const collapseNewBoxBtn = document.getElementById('collapseNewBoxBtn');

expandNewBoxBtn.addEventListener('click', expandNewBoxForm);
collapseNewBoxBtn.addEventListener('click', collapseNewBoxForm);

export function expandNewBoxForm() {
    newBoxForm.classList.remove('collapsed');
    expandNewBoxBtn.classList.add('hidden');
    collapseNewBoxBtn.classList.remove('hidden');
};

export function collapseNewBoxForm() {
    newBoxForm.classList.add('collapsed');
    expandNewBoxBtn.classList.remove('hidden');
    collapseNewBoxBtn.classList.add('hidden');
};


// --------------------------------------
// Box Menu Buttons
// --------------------------------------
const boxMenuMainBtns = document.querySelectorAll('.boxMenuMainBtn');
const editBoxBtns = document.querySelectorAll('.editBoxBtn');
const moveBoxBtns = document.querySelectorAll('.moveBoxBtn');
const archiveBoxBtns = document.querySelectorAll('.archiveBoxBtn');
const newNoteBtns = document.querySelectorAll('.newNoteBtn');

// Open Menu for Individual Box
boxMenuMainBtns.forEach(button => {
    button.addEventListener('click', () => {
        const boxId = button.dataset.boxId;
        toggleBoxMenuVis(boxId);
    })
})
window.toggleBoxMenuVis = function (id) {
    const boxMenu = document.querySelector(`.boxMenuBtns[data-box-id="${id}"]`);
    boxMenu.classList.toggle('collapsed');
};

// Toggle Box Edit Form
editBoxBtns.forEach(button => {
    button.addEventListener('click', () => {
        const boxId = button.dataset.boxId;
        toggleBoxMenuVis(boxId);
        toggleBoxEditForm(boxId);
    })
});

window.toggleBoxEditForm = function (id) {
    const boxEditForm = document.querySelector(`.editBoxForm[data-box-id="${id}"]`);
    boxEditForm.classList.toggle('collapsed');
};

// Re-order Boxes -- to be updated once function is implemented
moveBoxBtns.forEach(button => {
    button.addEventListener('click', () => {
        const boxId = button.dataset.boxId;
        console.log(`Move box ${boxId}`);
    })
});

// Archive Boxes -- to be updated once function is implemented
archiveBoxBtns.forEach(button => {
    button.addEventListener('click', () => {
        const boxId = button.dataset.boxId;
        console.log(`Archive box ${boxId}`);
    })
});

// --------------------------------------
// Note Form Buttons
// --------------------------------------
const noteFormWindow = document.getElementById('noteFormWindow');
const noteTypeForm = document.getElementById('noteTypeForm');
const noteContentForm = document.getElementById('noteContentForm');

const cancelNoteBtn = document.querySelector('.cancelNoteBtn');
const noteTextBtn = document.querySelector(".noteTypeBtn.text")
const returnTypeBtn = document.getElementById("returnTypeBtn");

// Add new Note to Box
newNoteBtns.forEach(button => {
    button.addEventListener('click', () => {
        currentBoxId = button.dataset.boxId;
        currentBoxColour = button.dataset.colour;

        document.getElementById('noteBoxId').value = currentBoxId;
        const noteColourValue = document.getElementById('noteColour');
        noteColourValue.value = currentBoxColour;

        noteFormWindow.classList.remove('collapsed');
        noteTypeForm.classList.remove('collapsed');
    })
});
cancelNoteBtn.addEventListener('click', () => {
    noteFormWindow.classList.add('collapsed');
    noteTypeForm.classList.add('collapsed');
    noteContentForm.classList.add('collapsed');
})
returnTypeBtn.addEventListener('click', () => {
    noteContentForm.classList.add('collapsed');
    noteTypeForm.classList.remove('collapsed');
    setNoteType = null;
})
noteTextBtn.addEventListener('click', () => {
    setNoteType = 'text';
    document.getElementById('noteType').value = setNoteType;

    noteTypeForm.classList.add('collapsed');
    noteContentForm.classList.remove('collapsed');
})


// --------------------------------------
// Note Buttons
// --------------------------------------
const expandNoteBtns = document.querySelectorAll('.expandNoteBtn');
const collapseNoteBtns = document.querySelectorAll('.collapseNoteBtn');
const noteMenuMainBtns = document.querySelectorAll('.noteMenuMainBtn');
const editNoteBtns = document.querySelectorAll('.editNoteBtn');


noteMenuMainBtns.forEach(button => {
    button.addEventListener('click', () => {
        const noteId = button.dataset.noteId;
        toggleNoteMenuVis(noteId);
    })
});

window.toggleNoteMenuVis = function (id) {
    const noteMenu = document.querySelector(`.noteMenuBtns[data-note-id="${id}"]`);
    noteMenu.classList.toggle('collapsed');
};

expandNoteBtns.forEach(button => {
    button.addEventListener('click', () => {
        const noteId = button.dataset.noteId;
        expandNoteBody(noteId, button);
    })
});
collapseNoteBtns.forEach(button => {
    button.addEventListener('click', () => {
        const noteId = button.dataset.noteId;
        collapseNoteBody(noteId, button);
    })
});
export function expandNoteBody(id, button) {
    const noteBody = document.querySelector(`.noteBody[data-note-id="${id}"]`);
    const collapseBtn = document.querySelector(`.collapseNoteBtn[data-note-id="${id}"]`);

    noteBody.classList.remove('collapsed');
    collapseBtn.classList.remove('collapsed');
    button.classList.add('collapsed');
}
export function collapseNoteBody(id, button) {
    const noteBody = document.querySelector(`.noteBody[data-note-id="${id}"]`);
    const expandBtn = document.querySelector(`.expandNoteBtn[data-note-id="${id}"]`);

    noteBody.classList.add('collapsed');
    expandBtn.classList.remove('collapsed');
    button.classList.add('collapsed');
}

editNoteBtns.forEach(button => {
    button.addEventListener('click', () => {
        const note = {
            _id: button.dataset.noteId,
            title: button.dataset.noteTitle,
            colour: button.dataset.noteColour,
            type: button.dataset.noteType,
            text: button.dataset.noteText
        }
        setEditNoteMode(note);
    })
});