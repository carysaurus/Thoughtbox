// boxRouter.js

// --------------------------------------
// Variables
// --------------------------------------
const express = require('express');
const router = express.Router();
const {
    Box
} = require('../models/boxModel');
// --------------------------------------
// Fetch All Boxes
// --------------------------------------


// --------------------------------------
// Create New Box
// --------------------------------------
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const {
            boxTitle,
            boxColour
        } = req.body;
        const box = new Box({
            title: boxTitle,
            colour: boxColour || undefined,
        });
        await box.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error creating new Box:', err);
        res.status(500).send('Failed to create box');
    }
});

// --------------------------------------
// Update Existing Box
// --------------------------------------
router.put("/edit/:id", async (req, res) => {
    try {
        const {
            editBoxTitle,
            editBoxColour
        } = req.body;
        await Box.findByIdAndUpdate(req.params.id, {
            title: editBoxTitle,
            colour: editBoxColour
        });

        res.redirect('/');

    } catch (error) {
        console.error('Error updating Box:', error);
        res.status(500).send('Failed to update Box');
    }
});

// --------------------------------------
// Delete a Box
// --------------------------------------
router.delete("/delete/:id", async (req, res) => {
    try {
        await Box.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting Box:', error);
        res.status(500).send('Failed to delete Box');
    }
});

module.exports = router;