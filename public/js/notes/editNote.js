// editNote.js


const noteContentForm = document.getElementById('noteContentForm');
const noteFormWindow = document.getElementById('noteFormWindow');
const noteTypeForm = document.getElementById('noteTypeForm');

const noteTitleValue = document.getElementById('noteTitle');
const noteColourValue = document.getElementById('noteColour');
const noteTextValue = document.getElementById('noteText');

export function setEditNoteMode(note) {
    // Update Form Action
    noteContentForm.setAttribute('action',
        `/notes/edit/${note._id}?_method=PUT`);

    // Populate hidden fields
    document.getElementById('noteBoxId').value = note.boxId;
    document.getElementById('noteType').value = note.type;

    // Populate visible fields
    noteTitleValue.value = note.title;
    noteColourValue.value = note.colour;
    noteTextValue.value = note.text;

    // Show input based on note type
    if (note.type === 'text') {
        document.getElementById('noteText').style.display = "flex";
    }
    // Show form
    noteFormWindow.classList.remove('collapsed');
    noteTypeForm.classList.add('collapsed');
    noteContentForm.classList.remove('collapsed');
};