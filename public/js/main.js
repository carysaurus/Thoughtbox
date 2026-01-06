// main.js
const addBox = document.getElementById('addBox');
const boxTitleInput = document.getElementById('boxTitle');
const boxColourSelect = document.getElementById('boxColour');
const boxesShowAll = document.getElementById('boxesShowAll');

let boxColours = [];
let noteColours = [];

function fetchColourConfig() {
    fetch('/config/colours')
        .then(res => res.json())
        .then(data => {
            boxColours = data.boxColours;
            noteColours = data.noteColours;
        })
        .catch(err => console.log('Error fetching colours:', err));
};


// on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    feather.replace(); // Generates feather-data icons
    fetchBoxes();

});

// Function to fetch all Boxes

function fetchBoxes() {
    fetch('/boxes')
        .then(res => res.json())
        // Display Boxes
        .then(boxes => {
            boxesShowAll.innerHTML = '';
            boxes.forEach(box => {
                const boxItem = document.createElement('div');
                boxItem.classList.add('box');
                const colour = box.colour;
                boxItem.classList.add(colour);
                boxItem.dataset.id = box._id;

                // Create Title
                const boxTitle = document.createElement('h2');
                boxTitle.textContent = box.title;

                // Create Edit Box Button
                const editBtn = document.createElement('button');
                editBtn.classList.add('editBoxBtn');
                const editIcon = document.createElement('i');
                editIcon.setAttribute('data-feather', 'edit');

                editBtn.onclick = function () {
                    startEditBox(box._id);
                };

                // Create hidden Edit Form
                const editForm = document.createElement('form');
                const editTitle = document.createElement('input');
                editForm.classList.add('editBoxForm');
                editTitle.setAttribute('type', 'text');
                editTitle.value = box.title;

                const editColour = document.createElement('select');
                boxColours.forEach(colour => {
                    const option = document.createElement('option');
                    option.value = colour;
                    option.textContent = colour;
                    editColour.appendChild(option);
                });
                editColour.value = box.colour;

                const editBtnsAll = document.createElement('div');
                editBtnsAll.classList.add('editBtns');

                const editFormBtn = document.createElement('button');
                editFormBtn.classList.add('editFormBtn');
                const editFormIcon = document.createElement('i');
                editFormIcon.setAttribute('data-feather', 'check-square');
                editFormBtn.onclick = function () {
                    editBox(box._id);
                };

                const uneditFormBtn = document.createElement('button');
                uneditFormBtn.classList.add('uneditFormBtn');
                const uneditFormIcon = document.createElement('i');
                uneditFormIcon.setAttribute('data-feather', 'x-square');
                uneditFormBtn.onclick = function () {
                    stopEditBox(box._id);
                };

                const deleteFormBtn = document.createElement('button');
                deleteFormBtn.classList.add('deleteFormBtn');
                const deleteFormIcon = document.createElement('i');
                deleteFormIcon.setAttribute('data-feather', 'trash-2');
                deleteFormBtn.onclick = function () {
                    deleteBox(box._id);
                };

                editFormBtn.appendChild(editFormIcon);
                uneditFormBtn.appendChild(uneditFormIcon);
                deleteFormBtn.appendChild(deleteFormIcon);
                editBtnsAll.appendChild(editFormBtn);
                editBtnsAll.appendChild(uneditFormBtn);
                editBtnsAll.appendChild(deleteFormBtn);
                editForm.appendChild(editTitle);
                editForm.appendChild(editColour);
                editForm.appendChild(editBtnsAll);


                // Create Space for Notes
                const boxNotes = document.createElement('div');
                boxNotes.classList.add('boxNotes');

                // Create New Notes Button
                const newNoteBtn = document.createElement('button');
                newNoteBtn.classList.add('newNoteBtn');
                const plusIcon = document.createElement('i');
                plusIcon.setAttribute('data-feather', 'plus');
                const noteIcon = document.createElement('i');
                noteIcon.setAttribute('data-feather', 'message-square');

                // Append elements
                editBtn.appendChild(editIcon);
                newNoteBtn.appendChild(plusIcon);
                newNoteBtn.appendChild(noteIcon);
                boxItem.appendChild(boxTitle);
                boxItem.appendChild(editBtn);
                boxItem.appendChild(editForm);
                boxItem.appendChild(boxNotes);
                boxItem.appendChild(newNoteBtn);
                boxesShowAll.appendChild(boxItem);

            });
            feather.replace();
        })
        .catch(err => console.error('Error fetching Boxes:', err));
};

// Create a new Box
addBox.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = boxTitleInput.value;
    const colour = boxColourSelect.value || 'light';
    const newBox = {
        title,
        colour
    };

    console.log(JSON.stringify(newBox));
    fetch('/boxes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBox)
        })
        .then(res => res.json())
        .then(box => {
            boxTitleInput.value = '';
            boxColourSelect.value = '';
            fetchBoxes();
        })
        .catch(err => console.error('Error creating new Box:', err));
});

// Edit a Box
window.startEditBox = function (id) {
    const boxItem = document.querySelector(`.box[data-id="${id}"]`);
    const editForm = boxItem.querySelector('.editBoxForm');
    editForm.style.display = 'flex';
};
window.stopEditBox = function (id) {
    const boxItem = document.querySelector(`.box[data-id="${id}"]`);
    if (!boxItem) return;

    const editForm = boxItem.querySelector('.editBoxForm');
    if (!editForm) return;


    editForm.style.display = 'none';
    console.log("Stopped editing Box.");
    editForm.reset();
};

window.editBox = function (id, title, colour) {
    const boxItem = document.querySelector(`.box[data-id="${id}"]`);
    const editForm = boxItem.querySelector('.editBoxForm');
    const editTitle = editForm.querySelector('input');
    const editColour = editForm.querySelector('select');

    const updatedBox = {};

    if (editTitle.value.trim() !== '') {
        updatedBox.title = editTitle.value.trim();
    };
    updatedBox.colour = editColour.value;

    fetch(`/boxes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBox)
        })
        .then(() => fetchBoxes())
        .catch(err => console.error('Error editing Box:', err));
};

// Delete a Box
window.deleteBox = function (id) {
    fetch(`/boxes/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchBoxes())
        .catch(err => console.error('Error deleting Box:', err));
};