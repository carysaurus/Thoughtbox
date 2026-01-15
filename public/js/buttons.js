// buttons.js
import {
    loadNoteTypeForm,
    closeNoteFormWindow,
    setTextNote,
    setImageNote,
    resetNoteType,
    setEditNoteMode,
    resetNoteForm,
    loadNoteImagePreview
} from "./notes/noteForm.js";

import {
    toggleNoteMenuVis,
    expandNoteBody,
    collapseNoteBody
} from "./notes/notes.js";

import {
    toggleBoxMenuVis,
    toggleBoxEditForm
} from "./boxes/boxes.js";

let currentBoxId = null;

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
    button.addEventListener('click', (event) => {
        const boxId = button.dataset.boxId;
        toggleBoxMenuVis(boxId, event);
    })
});

// Toggle Box Edit Form
editBoxBtns.forEach(button => {
    button.addEventListener('click', () => {
        const boxId = button.dataset.boxId;
        toggleBoxEditForm(boxId);
        toggleBoxMenuVis(boxId);
    })
});

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
const cancelNoteBtn = document.querySelector('.cancelNoteBtn');
const returnTypeBtn = document.getElementById("returnTypeBtn");

const noteTextBtn = document.querySelector(".noteTypeBtn.text");
const noteImageBtn = document.querySelector(".noteTypeBtn.image");
const previewImgBtn = document.getElementById("previewImgBtn");


// Add new Note to Box
newNoteBtns.forEach(button => {
    button.addEventListener('click', () => {
        resetNoteForm();
        currentBoxId = button.dataset.boxId;
        currentBoxColour = button.dataset.colour;

        document.getElementById('noteBoxId').value = currentBoxId;
        const noteColourValue = document.getElementById('noteColour');
        noteColourValue.value = currentBoxColour;

        loadNoteTypeForm();
    })
});
cancelNoteBtn.addEventListener('click', () => {
    closeNoteFormWindow();
});
returnTypeBtn.addEventListener('click', () => {
    resetNoteType();
    loadNoteTypeForm();
});

noteTextBtn.addEventListener('click', () => {
    returnTypeBtn.style.display = 'flex';
    setTextNote();
});
noteImageBtn.addEventListener('click', () => {
    returnTypeBtn.style.display = 'flex';
    setImageNote();
});
previewImgBtn.addEventListener('click', () => {
    loadNoteImagePreview();
})


// --------------------------------------
// Note Buttons
// --------------------------------------
const expandNoteBtns = document.querySelectorAll('.expandNoteBtn');
const collapseNoteBtns = document.querySelectorAll('.collapseNoteBtn');
const noteMenuMainBtns = document.querySelectorAll('.noteMenuMainBtn');
const editNoteBtns = document.querySelectorAll('.editNoteBtn');


noteMenuMainBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const noteId = button.dataset.noteId;
        toggleNoteMenuVis(noteId, event);
    })
});

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

editNoteBtns.forEach(button => {
    button.addEventListener('click', () => {
        const note = {
            _id: button.dataset.noteId,
            title: button.dataset.noteTitle,
            colour: button.dataset.noteColour,
            type: button.dataset.noteType,
            text: button.dataset.noteText || '',
            image: {
                src: button.dataset.noteImgSrc || '',
                desc: button.dataset.noteImgDesc || '',
            },
            tags: button.dataset.noteTags,
        };
        setEditNoteMode(note);
    })
});