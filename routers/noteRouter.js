// notesRouter.js

// --------------------------------------
// Variables
// --------------------------------------
const express = require('express');
const router = express.Router();
const {
    Note
} = require('../models/noteModel');

// --------------------------------------
// Fetch All Notes
// --------------------------------------
// router.get('/', async (req, res) => {
//     try {
//         const notes = await Note.find({
//             archived: false
//         });

//         // Update to filter by UserId once User feature is functional

//         res.status(200).json(notes);
//     } catch (err) {
//         res.status(500).json({
//             message: 'Something went wrong! Please try again later.',
//             error: err.message
//         });
//     }
// });

// --------------------------------------
// Create New Note
// --------------------------------------
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const {
            noteTitle,
            noteColour,
            noteType,
            noteBoxId,
            noteText,
        } = req.body;

        if (!noteBoxId) {
            return res.status(400).send('Box ID is required');
        };

        const note = new Note({
            title: noteTitle,
            colour: noteColour || undefined,
            type: noteType,
            boxId: noteBoxId,
        });

        if (noteType === 'text') {
            note.text = noteText;
        };

        await note.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error creating new Thought:', err);
        res.status(500).send('Failed to create new Thought');
    }
});

// --------------------------------------
// Update Existing Note
// --------------------------------------


router.put("/edit/:id", async (req, res) => {
    try {
        const {
            noteTitle,
            noteColour,
            noteType,
            noteText,
        } = req.body;

        const updateData = {
            title: noteTitle,
            colour: noteColour
        };
        if (noteType === 'text') {
            updateData.text = noteText;
        };

        await Note.findByIdAndUpdate(req.params.id, updateData);

        res.redirect('/');

    } catch (error) {
        console.error('Error updating Box:', error);
        res.status(500).send('Failed to update Box');
    }
});

// Update Collasped State
router.put('/collapse/:id', async (req, res) => {
    try {
        const collapsed = req.body.collapsed === 'true';
        await Note.findByIdAndUpdate(req.params.id, {
            collapsed
        });
        res.sendStatus(204);
    } catch (err) {
        console.error('Error updating Thought collapse state:', err);
        res.status(500).send('Failed to update Thought state');
    }
});

// Archive Note
router.put('/archive/:id', async (req, res) => {
    try {
        const archived = req.body.archived === 'true';
        await Note.findByIdAndUpdate(req.params.id, {
            archived
        });
        res.sendStatus(204);
        res.redirect('/');
    } catch (err) {
        console.error('Error updating Thought collapse state:', err);
        res.status(500).send('Failed to update Thought state');
    }
});




// --------------------------------------
// Delete a Note
// --------------------------------------
router.delete('/delete/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting Thought:', err);
        res.status(500).send('Failed to delete Thought');
    }
})
module.exports = router;