// routers/notesRouter.js

// --------------------------------------
// Variables
// --------------------------------------
const express = require("express");
const router = express.Router();
const { Note } = require("../models/noteModel");

// --------------------------------------
// Create New Note
// --------------------------------------
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const {
      noteTitle,
      noteColour,
      noteType,
      noteBoxId,
      noteText,
      noteImgSrc,
      noteImgDesc,
      noteTags,
    } = req.body;

    if (!noteBoxId) {
      return res.status(400).send("Box ID is required");
    }

    const lastNote = await Note.findOne({ boxId: noteBoxId })
      .sort({ order: -1 })
      .select("order");
    const newOrder = lastNote ? lastNote.order + 1 : 0;

    const note = new Note({
      title: noteTitle,
      colour: noteColour || undefined,
      type: noteType,
      boxId: noteBoxId,
      order: newOrder,
    });

    if (noteTags && noteTags.trim() !== "") {
      note.tags = noteTags.split(",").filter((tag) => tag.length > 0);
    }

    if (noteType === "text") {
      note.text = noteText;
    }

    if (noteType === "image") {
      note.image = {
        src: noteImgSrc,
        desc: noteImgDesc,
      };
    }

    await note.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error creating new Thought:", err);
    res.status(500).send("Failed to create new Thought");
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
      noteImgSrc,
      noteImgDesc,
      noteTags,
    } = req.body;

    const updateData = {
      title: noteTitle,
      colour: noteColour,
    };

    if (noteTags && noteTags.trim() !== "") {
      updateData.tags = noteTags.split(",").filter((tag) => tag.length > 0);
    }

    if (noteType === "text") {
      updateData.text = noteText;
    }
    if (noteType === "image") {
      updateData.image = {
        src: noteImgSrc,
        desc: noteImgDesc,
      };
    }

    await Note.findByIdAndUpdate(req.params.id, updateData);

    res.redirect("/");
  } catch (error) {
    console.error("Error updating Box:", error);
    res.status(500).send("Failed to update Box");
  }
});

// Update Collasped State
router.put("/collapse/:id", async (req, res) => {
  try {
    const collapsed = req.body.collapsed === "true";
    await Note.findByIdAndUpdate(req.params.id, {
      collapsed,
    });
    res.sendStatus(204);
  } catch (err) {
    console.error("Error updating Thought collapse state:", err);
    res.status(500).send("Failed to update Thought state");
  }
});

// --------------------------------------
// Change Note Order
// --------------------------------------
// Move Up
router.put("/order/:id/up", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    const noteAbove = await Note.findOne({
      boxId: note.boxId,
      order: { $gt: note.order },
    }).sort({ order: 1 });

    if (!noteAbove) {
      res.sendStatus(204);
      return;
    }

    const tempOrder = note.order;
    note.order = noteAbove.order;
    noteAbove.order = tempOrder;

    await note.save();
    await noteAbove.save();

    res.redirect("/");
  } catch (err) {
    console.error("Error moving Thought:", err);
    res.status(500).send("Failed to move Thought");
  }
});

// Move Down
router.put("/order/:id/down", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    const noteBelow = await Note.findOne({
      boxId: note.boxId,
      order: { $lt: note.order },
    }).sort({ order: -1 });

    if (!noteBelow) {
      res.sendStatus(204);
      return;
    }

    const tempOrder = note.order;
    note.order = noteBelow.order;
    noteBelow.order = tempOrder;

    await note.save();
    await noteBelow.save();

    res.redirect("/");
  } catch (err) {
    console.error("Error moving Thought:", err);
    res.status(500).send("Failed to move Thought");
  }
});

// --------------------------------------
// Archive/Unarchive Note
// --------------------------------------
router.put("/archive/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    await Note.findByIdAndUpdate(req.params.id, {
      archived: !note.archived,
    });
    console.log("Note Archived!");

    res.redirect("/");
  } catch (error) {
    console.error("Error updating Note:", error);
    res.status(500).send("Failed to update Note");
  }
});

// --------------------------------------
// Delete a Note
// --------------------------------------
router.delete("/delete/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting Thought:", err);
    res.status(500).send("Failed to delete Thought");
  }
});
module.exports = router;
