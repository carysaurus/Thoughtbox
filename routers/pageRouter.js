// routers/pageRouter.js

const express = require("express");
const { Box } = require("../models/boxModel");
const { Note } = require("../models/noteModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userBoxes = await Box.find({
      archived: false,
    }).sort({ order: -1 });
    // Box.find({ user: req.user._id });
    const boxNotes = await Note.find({ archived: false }).sort({
      order: -1,
    });

    const firstBoxOrder = userBoxes[0].order;
    const lastBoxOrder = userBoxes[userBoxes.length - 1].order;

    res.render("index", {
      boxes: userBoxes,
      notes: boxNotes,
    });
  } catch (err) {
    console.error("Error fetching User data:", err);
    res.status(500).send("Failed to load data");
  }
});

router.get("/archived", async (req, res) => {
  try {
    const userBoxes = await Box.find({
      $or: [{ archived: true }, { containsArchivedNotes: { $gt: 0 } }],
    });
    // Box.find({ user: req.user._id });
    const boxNotes = await Note.find({ archived: true });
    res.render("index", {
      boxes: userBoxes,
      notes: boxNotes,
    });
  } catch (err) {
    console.error("Error fetching User data:", err);
    res.status(500).send("Failed to load data");
  }
});

module.exports = router;
