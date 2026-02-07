// routers/pageRouter.js

const express = require("express");
const { Box } = require("../models/boxModel");
const { Note } = require("../models/noteModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = req.user || null;

    // get toast from session and clear it
    const toastMessage = req.session.toastMessage || null;
    delete req.session.toastMessage;

    let userBoxes = [];
    let boxNotes = [];

    if (user) {
      userBoxes = await Box.find({
        userId: req.user._id,
        archived: false,
      }).sort({ order: -1 });

      boxNotes = await Note.find({
        userId: req.user._id,
        archived: false,
      }).sort({
        order: -1,
      });
    }
    res.render("index", {
      user: req.user || null,
      boxes: userBoxes,
      notes: boxNotes,
      toastMessage,
      userView: "home",
    });
  } catch (err) {
    console.error("Error fetching User data:", err);
    res.status(500).send("Failed to load data");
  }
});

router.get("/archived", async (req, res) => {
  try {
    const user = req.user || null;
    let userBoxes = [];
    let boxNotes = [];

    // get toast from session and clear it
    const toastMessage = req.session.toastMessage || null;
    delete req.session.toastMessage;

    if (user) {
      userBoxes = await Box.find({
        userId: req.user._id,
        $or: [{ archived: true }, { containsArchivedNotes: { $gt: 0 } }],
      });
      const findArchived = await Box.find({
        userId: req.user._id,
        archived: true,
      });
      const archivedBoxes = findArchived.map((box) => box._id);

      boxNotes = await Note.find({
        userId: req.user._id,
        $or: [{ archived: true }, { boxId: { $in: archivedBoxes } }],
      });
    }
    res.render("index", {
      user: req.user || null,
      boxes: userBoxes,
      notes: boxNotes,
      toastMessage,
      userView: "archive",
    });
  } catch (err) {
    console.error("Error fetching User data:", err);
    res.status(500).send("Failed to load data");
  }
});

module.exports = router;
