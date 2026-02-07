// routers/boxRouter.js

// --------------------------------------
// Variables
// --------------------------------------
const express = require("express");
const router = express.Router();
const { Box } = require("../models/boxModel");
// --------------------------------------
// Fetch All Boxes
// --------------------------------------

// --------------------------------------
// Create New Box
// --------------------------------------
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.user) {
      return res.status(401).send("Not authenticated");
    }

    const { boxTitle, boxColour } = req.body;

    const lastBox = await Box.findOne().sort({ order: -1 }).select("order");
    const newOrder = lastBox ? lastBox.order + 1 : 0;

    const box = new Box({
      userId: req.user._id,
      title: boxTitle,
      colour: boxColour || undefined,
      order: newOrder,
    });
    await box.save();
    req.session.toastMessage = "boxCreated";
    res.redirect("/");
  } catch (err) {
    console.error("Error creating new Box:", err);
    res.status(500).send("Failed to create box");
  }
});

// --------------------------------------
// Update Existing Box
// --------------------------------------
router.put("/edit/:id", async (req, res) => {
  try {
    const { editBoxTitle, editBoxColour } = req.body;
    await Box.findByIdAndUpdate(req.params.id, {
      title: editBoxTitle,
      colour: editBoxColour,
    });
    req.session.toastMessage = "boxUpdated";
    res.redirect("/");
  } catch (error) {
    console.error("Error updating Box:", error);
    res.status(500).send("Failed to update Box");
  }
});

// --------------------------------------
// Archive/Unarchive Box
// --------------------------------------
router.put("/archive/:id", async (req, res) => {
  try {
    const box = await Box.findById(req.params.id);
    await Box.findByIdAndUpdate(req.params.id, {
      archived: !box.archived,
    });
    if (box.archived) {
      req.session.toastMessage = "boxUnarchived";
      res.redirect("/archived");
    } else {
      req.session.toastMessage = "boxArchived";
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error updating Box:", error);
    res.status(500).send("Failed to update Box");
  }
});

// --------------------------------------
// Update Archived Note Count
// --------------------------------------
router.put("/archive/:id/notes/add", async (req, res) => {
  try {
    const box = await Box.findById(req.params.id);
    await Box.findByIdAndUpdate(req.params.id, {
      containsArchivedNotes: (box.containsArchivedNotes += 1),
    });
    console.log("Box contains +1 archived Thought");

    res.redirect("/");
  } catch (error) {
    console.error("Error updating Box:", error);
    res.status(500).send("Failed to update Box");
  }
});
router.put("/archive/:id/notes/remove", async (req, res) => {
  try {
    const box = await Box.findById(req.params.id);
    await Box.findByIdAndUpdate(req.params.id, {
      containsArchivedNotes: (box.containsArchivedNotes -= 1),
    });
    console.log("Box contains -1 archived Thought");

    res.redirect("/");
  } catch (error) {
    console.error("Error updating Box:", error);
    res.status(500).send("Failed to update Box");
  }
});

// --------------------------------------
// Change Box Order
// --------------------------------------
// Move Left
router.put("/order/:id/left", async (req, res) => {
  try {
    const box = await Box.findById(req.params.id);

    const boxBefore = await Box.findOne({
      order: { $gt: box.order },
    }).sort({ order: 1 });

    if (!boxBefore) {
      res.sendStatus(204);
      return;
    }

    const tempOrder = box.order;
    box.order = boxBefore.order;
    boxBefore.order = tempOrder;

    await box.save();
    await boxBefore.save();

    res.redirect("/");
  } catch (err) {
    console.error("Error moving Box:", err);
    res.status(500).send("Failed to move Box");
  }
});

// Move Right
router.put("/order/:id/right", async (req, res) => {
  try {
    const box = await Box.findById(req.params.id);

    const boxAfter = await Box.findOne({
      order: { $lt: box.order },
    }).sort({ order: -1 });

    if (!boxAfter) {
      res.sendStatus(204);
      return;
    }

    const tempOrder = box.order;
    box.order = boxAfter.order;
    boxAfter.order = tempOrder;

    await box.save();
    await boxAfter.save();

    res.redirect("/");
  } catch (err) {
    console.error("Error moving Box:", err);
    res.status(500).send("Failed to move Box");
  }
});

// --------------------------------------
// Delete a Box
// --------------------------------------
router.delete("/delete/:id", async (req, res) => {
  try {
    await Box.findByIdAndDelete(req.params.id);
    req.session.toastMessage = "boxDeleted";
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting Box:", error);
    res.status(500).send("Failed to delete Box");
  }
});

module.exports = router;
